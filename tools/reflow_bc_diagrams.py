from pathlib import Path
import xml.etree.ElementTree as ET
import math
NS='http://www.w3.org/2000/svg';ET.register_namespace('',NS)
def width(t):return sum(1 if ord(c)>255 else .54 for c in t)
def wrap(t,limit):
 out=[];line=''
 for c in t:
  if width(line+c)>limit and line:out.append(line);line=''
  line+=c
 if line:out.append(line)
 return out
for p in Path('reports/bc/diagrams').glob('*.svg'):
 root=ET.parse(p).getroot()
 for parent in root.iter():
  boxes=[r for r in parent if r.tag==f'{{{NS}}}rect' and r.get('x')]
  for rect in boxes:
   x=float(rect.get('x'));y=float(rect.get('y'));w=float(rect.get('width'));ht=float(rect.get('height'))
   texts=[t for t in parent if t.tag==f'{{{NS}}}text' and x<=float(t.get('x',0))<=x+w and y<=float(t.get('y',0))<=y+ht]
   if not texts:continue
   # Remove only redundant Chinese name introduced by term expansion.
   content=[''.join(t.itertext()).replace('不列颠哥伦比亚省提名 不列颠哥伦比亚省省提名计划','不列颠哥伦比亚省省提名计划') for t in texts]
   size=17
   while True:
    lines=[line for text in content for line in wrap(text,(w-25)/size)]
    lh=min(24,(ht-14)/len(lines))
    if lh>=size*1.1 or size<=12:break
    size-=1
   for t in texts:parent.remove(t)
   start=y+(ht-lh*(len(lines)-1))/2+size*.35
   for i,line in enumerate(lines):
    t=ET.SubElement(parent,f'{{{NS}}}text',{'x':str(x+w/2),'y':str(start+i*lh),'text-anchor':'middle','font-size':str(size),'font-weight':'600' if i==0 else '400'});t.text=line
 p.write_text(ET.tostring(root,encoding='unicode'))
