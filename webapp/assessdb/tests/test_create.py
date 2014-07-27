import unittest
import transaction

from pyramid import testing

from ..models import (
    get_one_or_create,
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


class TestCreateStructure(unittest.TestCase):
    def setUp(self):
        self.config = testing.setUp()
        from sqlalchemy import create_engine
        engine = create_engine('sqlite://')
        DBSession.configure(bind=engine)
        Base.metadata.create_all(engine)

    def tearDown(self):
        DBSession.remove()
        testing.tearDown()

    def test_create_assessment(self):
        instr_role = Role(name='instructor')
        stud_role = Role(name='student')
        instr = Person(first='Joe',last='Smith',upid='A101')
        stud = Person(first='Sarah',last='Jones',upid='A099')
        phys = Course(subject='PHYS',num=150, sect=1, term=132, CRN=12345)
        assoc1 = CoursesPeople(course=phys, person=instr, role=instr_role)

