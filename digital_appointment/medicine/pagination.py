from rest_framework.pagination import LimitOffsetPagination


class ProviderLimitOffsetPagination(LimitOffsetPagination):
    """this customize limit of set config for provider api"""
    default_limit = 8
    max_limit = 20
    """
    if the dont know how set limit and offset 
    we can user this constructor for set default limit
    
    def __init__(self, limit=default_limit):
        super(ProviderLimitOffsetPagination, self).__init__()
        self.default_limit = limit
    """
