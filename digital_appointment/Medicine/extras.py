# all extra things like choices would be here

from abc import ABC


class Choices:
    """all choices would be accessible by this class"""

    @staticmethod
    def provider_speciality():

        """list of providers specialties.

        Returns:
            dict: provider speciality choices

        """

        return {'FM': 'Family medicine',
                'IM': 'Internal medicine',
                'EM': 'Emergency medicine',
                'OT': 'Other medicine'
                }
