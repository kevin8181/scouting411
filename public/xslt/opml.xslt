<?xml version="1.0" encoding="ISO-8859-1"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:template match="/opml">
		<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
			<head>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta name="referrer" content="unsafe-url" />
				<title>
					<xsl:value-of select="head/title" />
				</title>
				<link rel="stylesheet" href="https://www.xml.style/css/water.min.css" />
			</head>
			<body>
				<h1>
					<xsl:value-of select="head/title" />
				</h1>
				<p>
					<time>
						<xsl:value-of select="head/dateCreated" />
					</time>
				</p>
				<xsl:apply-templates select="body/outline" />
			</body>
		</html>
	</xsl:template>
	<xsl:template match="outline" xmlns="http://www.w3.org/1999/xhtml">
		<xsl:choose>
			<xsl:when test="@type">
				<xsl:choose>
					<xsl:when test="@xmlUrl">
						<li>
							<a href="{@htmlUrl}">
								<xsl:value-of select="@text" />
							</a>
							<a href="{@xmlUrl}">
								<img src="https://www.rss.style/favicon.svg" style="margin-left:1em;height:1rem;" alt="RSS/Atom Feed" />
							</a>
						</li>
					</xsl:when>
					<xsl:otherwise>
						<li>
							<a href="{@url}">
								<xsl:value-of select="@text" />
							</a>
						</li>
					</xsl:otherwise>
				</xsl:choose>
			</xsl:when>
			<xsl:otherwise>
				<details> <!-- adding an open="open" attribute will make everything open by default -->
					<summary>
						<xsl:value-of select="@text" />
					</summary>
					<ul>
						<xsl:apply-templates select="outline" />
					</ul>
				</details>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>
</xsl:stylesheet>