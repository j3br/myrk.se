---
title: 'Test'
layout: '~/layouts/MarkdownLayout.astro'
---


## Foo
Adkjsh fkjd dsfkjh

---

## dfdf

> gjfhg jfdhgdfg
* hdf
* jdfh 

```bash 
# Dockerfile
FROM python:alpine AS base

FROM base AS dependencies
COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt

FROM dependencies AS release

WORKDIR /app

COPY cfddns/ /app/cfddns/
COPY docker/start.sh /app/

RUN chmod +x /app/start.sh

CMD ["sh", "-c", "/app/start.sh"]
```
