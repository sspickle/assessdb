import os
import sys
import transaction

from sqlalchemy import engine_from_config

from pyramid.paster import (
    get_appsettings,
    setup_logging,
    )

from pyramid.scripts.common import parse_vars

from ..models import (
    expandvars_dict,
    DBSession,
    Course,
    Person,
    Role,
    Instrument,
    CoursesPeople,
    Assessment,
    Response,
    Answer,
    Item,
    ItemAnswers,
    Objective,
    ItemObjectives,
    InstrumentItems,
    Blob,
    ItemBlobs,
    AnswerBlobs,
    Base,
    )

def usage(argv):
    cmd = os.path.basename(argv[0])
    print('usage: %s <config_uri> [var=value]\n'
          '(example: "%s development.ini")' % (cmd, cmd))
    sys.exit(1)

def main(argv=sys.argv):
    if len(argv) < 2:
        usage(argv)
    config_uri = argv[1]
    options = parse_vars(argv[2:])
    setup_logging(config_uri)
    settings = get_appsettings(config_uri, options=options)
    settings = expandvars_dict(settings)
    engine = engine_from_config(settings, 'sqlalchemy.')
    DBSession.configure(bind=engine)
    Base.metadata.create_all(engine)
    with transaction.manager:
        instr_role = Role(name='instructor')
        DBSession.add(instr_role)
        stud_role = Role(name='student')
        DBSession.add(stud_role)
        instr = Person(first='Joe',last='Smith',upid='A101')
        DBSession.add(instr)
        stud = Person(first='Sarah',last='Jones',upid='A099')
        DBSession.add(stud)
        phys = Course(subject='PHYS',num=150, sect=1, term=132, CRN=12345)
        DBSession.add(phys)
        DBSession.flush()
        assoc1 = CoursesPeople(courseid=phys.id, personid=instr.id, roleid=instr_role.id)
        DBSession.add(assoc1)
        assoc2 = CoursesPeople(courseid=phys.id, personid=stud.id, roleid=stud_role.id)
        DBSession.add(assoc2)
        fmci = Instrument(name='FMCI', description="Force Motion Concept Inventory")
        DBSession.add(fmci)
        kine = Objective(name='Kinematics', description='position, velocity, acceleration and all that')
        DBSession.add(kine)
        DBSession.flush()
        item1 = Item(markup="Question 1")
        DBSession.add(item1)
        DBSession.flush()
        assoc3 = ItemObjectives(itemid=item1.id, objectiveid=kine.id)
        DBSession.add(assoc3)
        assoc4 = InstrumentItems(instrumentid=instr.id, itemid=item1.id, contextid='1')
        DBSession.add(assoc4)
        ans1 = Answer(markup="Answer 1")
        DBSession.add(ans1)
        DBSession.flush()
        itm_ans_assoc1 = ItemAnswers(itemid=item1.id, answerid=ans1.id, answerattr="C")
        DBSession.add(itm_ans_assoc1)
        assess1 = Assessment(type='pre',courseid=phys.id, instrumentid=fmci.id)
        DBSession.add(assess1)
        DBSession.flush()
        resp1 = Response(assessmentid=assess1.id, itemid=item1.id, personid=stud.id, value='A')
        DBSession.add(instr_role)
