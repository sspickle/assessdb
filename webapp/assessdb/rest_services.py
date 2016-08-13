"""
Cornice Services for REST API
"""

import json
import traceback

import sqlalchemy as sa

from pyramid.response import Response

from .models import (
    Person,
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
