# Set the base image to use to Ubuntu

FROM sspickle/psyco-pyramid:0.01

MAINTAINER Steve Spicklemire "steve@spvi.com"

ENV PATH /pyr-app/bin:$PATH
ENV SQLALCHEMY_URL postgresql+psycopg2://webuser@db/archivedev

ADD webapp /webapp

RUN cd /webapp; \
    python setup.py develop

EXPOSE 6543

ENTRYPOINT ["/pyr-app/bin/pserve"]
CMD ["/webapp/development.ini"]
