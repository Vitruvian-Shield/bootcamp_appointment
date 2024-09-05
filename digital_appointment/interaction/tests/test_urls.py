from django.test import SimpleTestCase
from django.urls import reverse, resolve
from interaction.views import Comment


class TestUrls(SimpleTestCase):
    """test class for interaction all urls"""
    def test_urls_post_comment(self):
        """
        post_comment/ url be test in this case
        """
        url = reverse('post_comment')
        self.assertEquals(resolve(url).func.view_class, Comment)
