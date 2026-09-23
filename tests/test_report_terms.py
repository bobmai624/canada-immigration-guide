import unittest
from tools.report_terms import expand_text,scan_text
class Terms(unittest.TestCase):
 def test_full_repetition(self):
  x=expand_text('AAIP 与 AAIP；NOC 33102；CLB 7')
  self.assertEqual(x.count('阿尔伯塔优势移民计划（Alberta Advantage Immigration Program，AAIP）'),2)
  self.assertFalse(scan_text(x))
 def test_idempotent(self):
  x=expand_text('BC PNP 与 PGWP');self.assertEqual(x,expand_text(x))
 def test_boundary(self):
  self.assertTrue(scan_text('NOC 33102'));self.assertEqual(expand_text('CANADA'),'CANADA')
if __name__=='__main__':unittest.main()
