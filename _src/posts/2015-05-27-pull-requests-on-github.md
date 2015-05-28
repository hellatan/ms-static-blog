---
title: Pull Requests on Github
date: 2015-05-27
template: post.html
collection: posts
tags: workflow, github, git, front-end
draft: true
---

# Pull Requests on github

This is the typical workflow for 1stdibs and front-end code reviews/pull requests:

1. open up against the proper branch
2. add appropriate labels
    - "milestone tbd" if no milestone yet
    - "ready for review" if you think it is in a mergeable state (merge conflicts aside)
    - "don't merge" if, well, it shouldn't be merged yet
    - "hotfix" this should only be used for unscheduled releases (typically small fixes)
    - "untied" if code can go out without any milestone, typically dealer storefronts (.com repo) or static repo 
3. add a milestone
    - unless if the PR has the "milestone tbd" label, there should always be a milestone associated with a PR
      This makes it easier for the repo maintainers to see what is landing per release
4. add an assignee
    - typically it will be the team lead

Adding a useful description is helpful, but not required. However, if there are dependencies in other repos, please add that to the DESCRIPTION field.
Try not to leave it in as a comment. It makes it much easier to see dependencies in the description rather than needing to scour through the comments.
The description is editable after the PR is created so you can add it in later if necessary. Something like this is suffice:

> depends on: https://github.com/1stdibs/bunsen/pull/785

Github will auto format and shorten the URL for you. For example, if the above dependency was added to a description in .com, it would format to this:

> depends on: 1stdibs/bunsen#785

Update anything as necessary. Code/features can slip so if your PR gets moved out to a further milestone, update the milestone.
