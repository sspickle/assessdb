from pyramid.httpexceptions import HTTPFound
from pyramid.security import (
    remember,
    forget,
    )
    
from pyramid.response import Response
from sqlalchemy.exc import DBAPIError

from ..models import Course

from pyramid.view import (
    view_config,
    view_defaults
    )

from ..security import (
    USERS,
    check_password
)


@view_defaults(renderer='home.pt')
class AssessDBViews:
    def __init__(self, request):
        self.request = request
        self.logged_in = request.authenticated_userid

    @view_config(route_name='home', renderer='../templates/home.pt')
    def my_view(self):
        try:
            query = self.request.dbsession.query(Course)
            one = query.filter(Course.subject == 'physics').first()
        except DBAPIError:
            return Response(db_err_msg, content_type='text/plain', status=500)
        return {'name':'default view', 'one': one, 'project': 'assessdb'}


    @view_config(route_name='homex')
    def home(self):
        return {'name': 'Home View'}

    @view_config(route_name='hello')
    def hello(self):
        return {'name': 'Hello View'}

    @view_config(route_name='login', renderer='../templates/login.pt')
    def login(self):
        request = self.request
        login_url = request.route_url('login')
        referrer = request.url
        if referrer == login_url:
            referrer = '/'  # never use login form itself as came_from
        came_from = request.params.get('came_from', referrer)
        message = ''
        login = ''
        password = ''
        if 'form.submitted' in request.params:
            login = request.params['login']
            password = request.params['password']
            if check_password(password, USERS.get(login)):
                headers = remember(request, login)
                return HTTPFound(location=came_from,
                                 headers=headers)
            message = 'Failed login'

        return dict(
            name='Login',
            message=message,
            url=request.application_url + '/login',
            came_from=came_from,
            login=login,
            password=password,
        )

    @view_config(route_name='logout', renderer='../templates/logout.pt')
    def logout(self):
        request = self.request
        headers = forget(request)
        url = request.route_url('home')
        return HTTPFound(location=url,
                         headers=headers)
                         
                         
db_err_msg = """\
Pyramid is having a problem using your SQL database.  The problem
might be caused by one of the following things:

1.  You may need to run the "initialize_assessdb_db" script
    to initialize your database tables.  Check your virtual
    environment's "bin" directory for this script and try to run it.

2.  Your database server may not be running.  Check that the
    database server referred to by the "sqlalchemy.url" setting in
    your "development.ini" file is running.

After you fix the problem, please restart the Pyramid application to
try it again.
"""

                         