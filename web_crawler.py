# BUT HOW DO I MAKE IT DO ANYTHING 

def get_next_target(page):
	start_link = page.find('<a href=')
	if start_link == -1:
		return None, 0
	start_quote = page.find('"', start_link)
	end_quote = page.find('"', start_quote + 1)
	url = page[start_quote + 1 : end_quote]
	return url, end_quote

def union(p,q):
    for e in q:
        if e not in p:
            p.append(e)

def get_all_links(page):
	links = []
	while True :
		url, endpos = get_next_target(page)
		if url :
			links.append(url)
			page = page[endpos:]
		else :
			break	
	return links
	
def crawl_web(seed, max_depth):
	to_crawl = [seed]
	crawled = []
	next_depth = []
	depth = 0
	while to_crawl and depth <= max_depth :
		page = to_crawl.pop() #Depth first search
		if page not in crawled :
			union(next_depth, get_all_links(get_page(page))) 
			crawled.append(page)
		if not to_crawl:
			to_crawl, next_depth = next_depth, []
			depth = depth + 1
	return crawled

