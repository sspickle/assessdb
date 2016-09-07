"""
Cornice Services for REST API
"""

import json
import traceback

import sqlalchemy as sa

from pyramid.response import Response

from .models import (
    Person,
    Instrument,
    InstrumentItems,
    Course,
    Item,
    Answer,
    ItemAnswers,
)

from cornice import Service

person = Service(name='person', path='/restapi/persons/{id}', description="Person Service")
people = Service(name='people', path='/restapi/persons', description="People Service")

@person.get()
def get_person_info(request):
    """Get info for a person object"""
    pid = request.matchdict.get('id','')
    p=request.dbsession.query(Person).filter(Person.id==pid).first()
    return {'id':p.id, 'last':p.last, 'first':p.first, 'upid':p.upid, 'email':p.email}

@people.get()
def get_people_info(request):
    """Get a collection of person objects"""

    result = request.dbsession.query(Person).order_by(Person.last.asc(),Person.first.asc()).all()

    results=[]
    for p in result:
      results.append({'id':p.id, 'last':p.last, 'firstName':p.first, 'upid':p.upid, 'email':p.email})

    return results


instrument = Service(name='instrument', path='/restapi/instruments/{id}', description="Instrument Service")
instruments = Service(name='instruments', path='/restapi/instruments', description="Instruments Service")

@instrument.get()
def get_instrument_info(request):
    """Get info for an instrument object"""
    pid = request.matchdict.get('id','')
    p=request.dbsession.query(Instrument).filter(Instrument.id==pid).first()
    return {'id':p.id, 'name':p.name, 'description':p.description}

@instruments.get()
def get_people_info(request):
    """Get a collection of person objects"""

    result = request.dbsession.query(Instrument).order_by(Instrument.name.asc()).all()

    results=[]
    for p in result:
      results.append({'id':p.id, 'name':p.name, 'description':p.description})

    return results

course = Service(name='course', path='/restapi/courses/{id}', description="Course Service")
courses = Service(name='courses', path='/restapi/courses', description="Courses Service")

@course.get()
def get_course_info(request):
    """Get info for an instrument object"""
    cid = request.matchdict.get('id','')
    c=request.dbsession.query(Course).filter(Course.id==pid).first()
    return {'id':c.id, 'subject':c.subject, 'num':c.num, 'sect':c.sect, 'term':c.term, 'CRN':c.CRN}

@courses.get()
def get_courses_info(request):
    """Get a collection of person objects"""

    result = request.dbsession.query(Course).order_by(Course.CRN.asc()).all()

    results=[]
    for c in result:
      results.append({'id':c.id, 'subject':c.subject, 'num':c.num, 'sect':c.sect, 'term':c.term, 'CRN':c.CRN})

    return results
    
item = Service(name='item', path='/restapi/items/{id}', description="Item Service")
items = Service(name='items', path='/restapi/items', description="Items Service")

@item.get()
def get_item_info(request):
    """Get info for an instrument object"""
    cid = request.matchdict.get('id','')
    c=request.dbsession.query(Item).filter(Item.id==pid).first()
    return {'id':c.id, 'markup':c.markup}

@items.get()
def get_items_info(request):
    """Get a collection of person objects"""

    result = request.dbsession.query(Item).all()
    results=[]
    for c in result:
      results.append({'id':c.id, 'markup':c.markup})

    return results

