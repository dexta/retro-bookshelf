from bottle import route, run, request, response, redirect, static_file
import json

rootPath = "../src/"
assetPath = "../"
mimeTypes = { 	'html':'text/html; charset=utf-8', 'js':'text/javascript; charset=utf-8', 'json':'application/javascript; charset=utf-8',
				'css':'text/css; charset=utf-8', 'png':'image/png',	'jpg':'image/jpeg', 'gif':'image/gif', 'ico':'image/x-icon',
				'ttf':'font/opentype','woff':'application/font-woff','woff2':'application/font-woff'}


@route('/')
@route('/index.html')
def index():
	return static_file('index.html', root=rootPath, mimetype=mimeTypes['html'])

@route('/<path:path>')
def allStatic(path):
	fileType = ""
	for m in mimeTypes:
		fExt = ".%s"%m
		if path.find(fExt)!=-1:
			fileType = mimeTypes[m]
			break;
	# print(path)
	if fileType == "":
		print("some ERROR: %s"%path)
		return "404"

	if path.find("assets")!=-1:
		rPath = assetPath
	else:
		rPath = rootPath

	return static_file(path, root=rPath, mimetype=fileType)


run(host='0.0.0.0', port=9423, debug=True, reload=True)