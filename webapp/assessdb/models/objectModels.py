from sqlalchemy import (
    Column,
    Index,
    Integer,
    Text,
    Binary,
    DateTime,
    ForeignKey,
    )

from .meta import Base

from sqlalchemy.orm import (
    relationship,
    backref,
    )

from sqlalchemy.orm.exc import NoResultFound

import datetime
import os

def get_one_or_create(session,
                      model,
                      create_method='',
                      create_method_kwargs=None,
                      **kwargs):
    try:
        return session.query(model).filter_by(**kwargs).one(), True
    except NoResultFound:
        kwargs.update(create_method_kwargs or {})
        created = getattr(model, create_method, model)(**kwargs)
        try:
            session.add(created)
            session.flush()
            return created, False
        except IntegrityError:
            session.rollback()
            return session.query(model).filter_by(**kwargs).one(), True

class Course(Base):
    __tablename__ = 'courses'
    id = Column(Integer, primary_key=True)
    subject = Column(Text)
    num = Column(Integer)
    sect = Column(Text)
    term = Column(Integer)
    CRN = Column(Integer)
    importTag = Column(Text)
    
class Person(Base):
    __tablename__ = 'people'
    id = Column(Integer, primary_key=True)
    first = Column(Text)  # first name
    last = Column(Text)   # last name
    upid = Column(Text)   # external id (e.g., school student id)
    email = Column(Text)  # reference email address
    importTag = Column(Text)
    
class Role(Base):
    __tablename__ = 'roles'
    id = Column(Integer, primary_key=True)
    name = Column(Text)
    importTag = Column(Text)
    
class CoursesPeople(Base):
    """
    Association between People and Courses
    """
    __tablename__ = 'courses_people'
    courseid = Column(Integer, ForeignKey('courses.id'), primary_key=True)
    personid = Column(Integer, ForeignKey('people.id'), primary_key=True)
    roleid = Column(Integer, ForeignKey('roles.id'), primary_key=True)
    person = relationship("Person", backref="courses_assocs")
    course = relationship("Course", backref="people_assocs")
    role = relationship("Role")

class Instrument(Base):
    __tablename__ = 'instruments'
    id = Column(Integer, primary_key=True)
    ancestorid = Column(Integer, ForeignKey('instruments.id'))
    name = Column(Text)
    description = Column(Text)
    genetics = Column(Text)
    importTag = Column(Text)
    
class Objective(Base):
    __tablename__ = 'objectives'
    id = Column(Integer, primary_key=True)
    name = Column(Text)
    description = Column(Text)
    importTag = Column(Text)

class Assessment(Base):
    __tablename__ = 'assessments'
    id = Column(Integer, primary_key=True)
    type = Column(Text)
    courseid = Column(Integer, ForeignKey('courses.id'))
    instrumentid = Column(Integer, ForeignKey('instruments.id'))
    tstamp = Column(DateTime, default=datetime.datetime.utcnow)
    
class Response(Base):
    __tablename__ = 'responses'
    id = Column(Integer, primary_key=True)
    assessmentid = Column(Integer, ForeignKey('assessments.id'))
    personid = Column(Integer, ForeignKey('people.id'))
    itemid = Column(Integer, ForeignKey('items.id'))
    value = Column(Text)
    tstamp = Column(DateTime, default=datetime.datetime.utcnow)
    
class Item(Base):
    __tablename__ = 'items'
    id = Column(Integer, primary_key=True)
    ancestorid = Column(Integer, ForeignKey('items.id'), default=None)
    markup = Column(Text)
    genetics = Column(Text, default='')
    importTag = Column(Text)

class InstrumentItems(Base):
    __tablename__ = 'instrument_items'
    instrumentid = Column(Integer, ForeignKey('instruments.id'), primary_key=True)
    itemid = Column(Integer, ForeignKey('items.id'), primary_key=True)
    contextid = Column(Text)
    
class Blob(Base):
    __tablename__ = 'blobs'
    id = Column(Integer, primary_key=True)
    type = Column(Text)
    data = Column(Binary)
    importTag = Column(Text)

class Answer(Base):
    __tablename__ = 'answers'
    id = Column(Integer, primary_key=True)
    markup = Column(Text)
    importTag = Column(Text)
    
class AnswerBlobs(Base):
    __tablename__ = 'answer_blobs'
    answerid = Column(Integer, ForeignKey('answers.id'), primary_key=True)
    blobid = Column(Integer, ForeignKey('blobs.id'), primary_key=True)
    
class ItemBlobs(Base):
    __tablename__ = 'item_blobs'
    id = Column(Integer, primary_key=True)
    itemid = Column(Integer, ForeignKey('items.id'))
    blobid = Column(Integer, ForeignKey('blobs.id'))
   
class ItemAnswers(Base):
    __tablename__ = 'item_answers'
    itemid = Column(Integer, ForeignKey('items.id'), primary_key=True)
    answerid = Column(Integer, ForeignKey('answers.id'), primary_key=True)
    contextid = Column(Text, default='')  # id for this answer in the context of this item
    answerattr = Column(Text, default='') # attributes of this answer in the context of this item
    importTag = Column(Text)
    
class ItemObjectives(Base):
    __tablename__ = 'itemo_objectives'
    itemid = Column(Integer, ForeignKey('items.id'), primary_key=True)
    objectiveid = Column(Integer, ForeignKey('objectives.id'), primary_key=True)
    importTag = Column(Text)
