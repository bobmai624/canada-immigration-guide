import unittest
from pathlib import Path
class PrintContract(unittest.TestCase):
 def test_paper_and_readability(self):
  css=Path('reports/report.css').read_text()
  for x in ['size:A4','thead{display:table-header-group}','.print-meta','@page landscape']:
   self.assertIn(x,css)
 def test_button_handler(self):
  js=Path('reports/report.js').read_text();self.assertIn('window.print()',js);self.assertIn('printProvinceReport',js)
if __name__=='__main__':unittest.main()
