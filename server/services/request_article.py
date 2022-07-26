import newspaper
import sys

link = sys.argv[1]

article = newspaper.Article(link)
article.download()
article.parse()


content = article.text.encode('ascii', 'ignore')
title = article.title.encode('ascii', 'ignore')
if (article.authors):
  author = article.authors[0]
else:
  author = 'n/a'
print(title)
print(content)
print(author)
print(article.top_image)


sys.stdout.flush()