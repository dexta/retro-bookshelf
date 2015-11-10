from bottle import route, run, request, response, redirect, static_file
import json

rootPath = "../dest/"
assetPath = "../dest/"
mimeTypes = { 	'html':'text/html; charset=utf-8', 'js':'text/javascript; charset=utf-8', 'json':'application/javascript; charset=utf-8',
				'css':'text/css; charset=utf-8', 'png':'image/png',	'jpg':'image/jpeg', 'gif':'image/gif', 'ico':'image/x-icon',
				'ttf':'font/opentype','woff':'application/font-woff','woff2':'application/font-woff'}


@route('/')
@route('/index.html')
def index():
	return static_file('index.html', root=rootPath, mimetype=mimeTypes['html'])


@route('/favicon.ico')
def favicon():
	return "data:text/html; charset=iso-8859-1;base64,PCFET0NUWVBFIEhUTUwgUFVCTElDICItLy9JRVRGLy9EVEQgSFRNTCAyLjAvL0VOIj4KPGh0bWw+PGhlYWQ+Cjx0aXRsZT40MDMgRm9yYmlkZGVuPC90aXRsZT4KPC9oZWFkPjxib2R5Pgo8aDE+Rm9yYmlkZGVuPC9oMT4KPHA+WW91IGRvbid0IGhhdmUgcGVybWlzc2lvbiB0byBhY2Nlc3MgL2Zhdmljb24vNjI1Lzg0MS9mYXZpY29uLnBuZwpvbiB0aGlzIHNlcnZlci48L3A+CjwvYm9keT48L2h0bWw+Cg=="

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