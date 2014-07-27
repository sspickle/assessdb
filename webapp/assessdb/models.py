from sqlalchemy import (
    Column,
    Index,
    Integer,
    Text,
    Binary,
    DateTime,
    ForeignKey,
    )

from sqlalchemy.ext.declarative import declarative_base

from sqlalchemy.orm import (
    scoped_session,
    sessionmaker,
    relationship,
    backref,
    )

from zope.sqlalchemy import ZopeTransactionExtension

import datetime

#
# utility for expanding env variables
#

import os

def expandvars_dict(settings):
    """Expands all environment variables in a settings dictionary."""
    return dict((key, os.path.expandvars(value)) for
                key, value in settings.iteritems())


DBSession = scoped_session(sessionmaker(extension=ZopeTransactionExtension()))
Base = declarative_base()

class Course(Base):
    __tablename__ = 'courses'
    id = Column(Integer, primary_key=True)
    subject = Column(Text)
    num = Column(Integer)
    sect = Column(Text)
    term = Column(Integer)
    CRN = Column(Integer)
    
class Person(Base):
    __tablename__ = 'people'
    id = Column(Integer, primary_key=True)
    first = Column(Text)
    last = Column(Text)
    upid = Column(Text)
    
class Role(Base):
    __tablename__ = 'roles'
    id = Column(Integer, primary_key=True)
    name = Column(Text)
    
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
    
class Objective(Base):
    __tablename__ = 'objectives'
    id = Column(Integer, primary_key=True)
    name = Column(Text)
    description = Column(Text)

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

class Answer(Base):
    __tablename__ = 'answers'
    id = Column(Integer, primary_key=True)
    markup = Column(Text)
    
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
    answerattr = Column(Text, default='')
    
class ItemObjectives(Base):
    __tablename__ = 'itemo_objectives'
    itemid = Column(Integer, ForeignKey('items.id'), primary_key=True)
    objectiveid = Column(Integer, ForeignKey('objectives.id'), primary_key=True)
