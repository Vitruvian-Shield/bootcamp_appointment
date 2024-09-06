from rest_framework.pagination import LimitOffsetPagination


class AppointmentLimitOffsetPagination(LimitOffsetPagination):
    """appointment pagination class for every user"""
    default_limit = 10
    max_limit = 100
    """
       if the dont know how set limit and offset 
       we can user this constructor for set default limit

    def __init__(self, limit=default_limit):
        super(AppointmentLimitOffsetPagination, self).__init__()
        self.default_limit = limit
    """
