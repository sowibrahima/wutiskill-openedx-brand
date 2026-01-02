.PHONY: build build-wutiskill build-tenant1 clean

build: clean
	npm run build

build-wutiskill:
	rm -rf dist/wutiskill
	mkdir -p dist/wutiskill
	npm run build:wutiskill

build-tenant1:
	rm -rf dist/tenant1
	mkdir -p dist/tenant1
	npm run build:tenant1

clean:
	rm -rf dist
