.PHONY: build build-wutiskill build-10000codeurs clean

build: clean
	npm run build

build-wutiskill:
	rm -rf dist/wutiskill
	mkdir -p dist/wutiskill
	npm run build:wutiskill

build-10000codeurs:
	rm -rf dist/10000codeurs
	mkdir -p dist/10000codeurs
	npm run build:10000codeurs

clean:
	rm -rf dist
