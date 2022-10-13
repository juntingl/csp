f = *

init:
	pnpm install

build: compile

compile:
	rm -rf dist
	$$(pnpm bin)/tsc --module es6 --outDir dist/csp


publish: compile
	npm publish dist --access public

git:
	git config --global user.email $(email)

gitpod:
	gp env GIT_COMMITTER_EMAIL=$(email)
	gp env GIT_AUTHOR_EMAIL=$(email)
