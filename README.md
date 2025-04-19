# Scouters Online

the unofficial aggregator for official scouting news, resources, and online tools

## Project Scope

Scouters Online aims to be the central aggregator of all official Scouting America resources and news for volunteers.

## Adding a Link

### Inclusion Criteria

To be elligible for inclusion, a link must meet the following criteria:

- it's an official publication of Scouting America at the national level (council/district/unit publications, no third-party publications)
- it's a useful/noteworthy resource for Scouting volunteers, and not primarily intended for Scouting professionals
- it's not part of a larger set of pages (for example, one blog post part of a series, or one article in a collection of resources)
- it's not an old version of a resource that has been updated

### Process

You can request a new link be added by creating a PR with the changes. The link data is located in `src/lib/links/data/links.ts`.

## scaffolding todo

- github actions ci for linting and formatting
- eslint react
- metadata scraper (https://github.com/BetaHuhn/metadata-scraper, https://github.com/laurengarcia/url-metadata)

link processing

1. normalization check
   - for each link, check if valid url, check if passes normalization rules https://www.npmjs.com/package/normalize-url
   - check if all the links are different
2. fetch all the links
3. throw if a fetch fails or the status code is not 200
4. parse the page contents with the metadata scraper
5. combine the scraped tags with the rest of the link object

## blogs feeds

https://scoutlife.org/
https://www.scouting.org/feed
https://scoutingwire.org/feed/
https://blog.scoutingmagazine.org/feed/
https://www.scoutingnewsroom.org/
https://www.scoutshop.org/blog
https://www.summitbsa.org/blog/
https://ablescouts.org/
https://scoutingamericafoundation.org/foundation-news/
https://status.oa-scouting.org/history.rss //atom feed and email also available
https://confluence.oa-scouting.org/pages/viewrecentblogposts.action?key=OALMLC

https://www.scouting.org/outdoor-programs/trail-to-adventure/
https://troopleader.scouting.org/updates-blog/
https://podcast.scouting.org/
https://seascout.org/news/
https://oa-scouting.org/news/
https://www.scouting.org/topics/program-updates/program-updates-cub-scouts/
https://www.scouting.org/program-updates/

## periodicals

https://www.scouting.org/programs/scouts-bsa/advancement-and-awards/advancement-news/
https://www.philmontscoutranch.org/resources/philnews/
https://www.scouting.org/commissioners/newsletter-eblast/

## email newsletters

https://www.ntier.org/resources/newsletter-signup/
https://seascout.org/mailing-list/

## social

https://www.facebook.com/theboyscoutsofamerica
https://x.com/boyscouts
https://www.facebook.com/oalodgemaster
https://x.com/oalodgemaster

## marketing / landing pages

https://www.scouting.org/
https://stg.scouting.org/
https://www.exploring.org/
https://donations.scouting.org/
https://nam.scouting.org/
https://seascout.org/
https://councils.scouting.org/
https://arbsaf2018.scouting.org/bsa-foundation-annual-report-2018-home/
https://ar2018.scouting.org
https://ar2019.scouting.org/
https://scoutingamericafoundation.org/
https://scoutingamericalegacy.org/
https://oa-scouting.org/
https://www.bsarestructuring.org/

## reference and guidance

https://scoutingwire.org/marketing-and-membership-hub/
https://help.scoutbook.scouting.org/
https://troopleader.scouting.org/
https://tap.scouting.org/
https://confluence.oa-scouting.org/
https://scene.zeplin.io/project/59b6b6554fc4d8840a822300
https://ablescouts.org/toolbox/
https://www.scouting.org/awards/awards-central/

## tools

https://beascout.scouting.org/
https://joinexploring.org/
https://scoutbook.scouting.org/
https://advancements.scouting.org/
https://my.scouting.org/
https://scouting.webdamdb.com/ - https://assets.scouting.org/
https://training.scouting.org/
https://directory.scouting.org/alumni-dashboard
https://discussions.scouting.org/
https://id.oa-scouting.org/
https://registration.oa-scouting.org/
https://members.oa-scouting.org/
https://portal.oa-scouting.org/
https://lodgemaster.oa-scouting.org/
https://status.oa-scouting.org/
https://jira.oa-scouting.org/
https://oalodgemaster.featureupvote.com/
https://www.scouting.org/awards/scholarships/

## other

https://www.scoutshop.org/
https://www.myscoutshop.org/
https://scoutingalumni.org/
https://nesa.org/
https://store.philmontscoutranch.org/
https://store.ntier.org/
https://store.summitbsa.org/
https://tradingpost.oa-scouting.org/
https://licensingbsa.org/
https://open.spotify.com/show/57YZ4Fu74WkSHE5qyVkQS2

## high adventure bases

https://www.philmontscoutranch.org/
https://seabaseha.org/
https://www.summitbsa.org/
https://www.ntier.org/
https://summiteventswv.com/
https://jamboreg.scouting.org/
https://jamboree.scouting.org/

dimensions

- type
  - blog
  - social
  - marketing / landing page
  - reference and guidance
  - tools
  - email newsletter
- topic
  - scout shop
  - philmont
- feed types
  - rss
  - facebook
  - instagram
  - twitter
  - youtube
