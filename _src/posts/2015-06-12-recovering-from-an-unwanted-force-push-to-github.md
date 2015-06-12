---
title: Recovering from an unwanted force-push to GitHub
publishDate: 2015-06-12
modifiedDate: 2015-06-12
author: thomas hallock
github: antialias
collection: posts
template: post.html
---

Oops! Did you accidentally force push the wrong commit to a branch on github? Even worse, do none of your coworkers have the old (correct) commit commit on their machine because it that commit was created by github when merging pull requeest? Well, you are outta luck as far as the github UI goes; there's no way that I can find to force reset a branch to a specific commit. Calm down, there is hope. Here is what you have to do:

Find the hash of commit that you force pushed over. Git should have told you this at the time you did the force push:

```bash
% git push --force origin master
Counting objects: 4, done.
Delta compression using up to 8 threads.
Compressing objects: 100% (2/2), done.
Writing objects: 100% (2/2), 284 bytes | 0 bytes/s, done.
Total 2 (delta 0), reused 0 (delta 0)
To https://github.com/antialias/antialias.github.io.git
 + 3c15973...41c4d05 master -> master (forced update)
```

In this case, the commit hash you want is `3c15973` (the one on the left on the last line). Keep that handy.

Now, using Chrome, keep your network inspector running while you create a dummy branch on github:

![make dummy branch](/images/make-dummy-branch.png)

Find the specific network request that created the new branch. It should be a POST:

![copy branch curl](/images/copy-curl-branch.png)

You should have a string in your clipboard that looks like this:

```bash
curl 'https://github.com/antialias/antialias.github.io/branches' -H 'Cookie: {a mess of cookies}' -H 'Origin: https://github.com' -H {a mess of headers} --data 'utf8=%E2%9C%93&authenticity\_token=__my-secret-auth-token__%3D%3D&name=dummy&branch=master&path=' --compressed
```

See where we are going with this? Now that you have this request copied, delete that new dummy branch from github because we are going to make it again, but a little differently.

Find the name of the parent branch in the the curl command that you copied. In this case it was `master`. Replace the parent branch name with the hash that you found from the output of your accidental force push, `3c15973`. Now paste this modified command into your terminal.

If all goes well, your dummy branch will be re-created and will be pointing to the commit that you overwrote with your accidental force push. `git fetch` and the old commit that you want will be pulled down to you local repository. Now force reset your branch to the old commit and force-push it back up to github:

```bash
git checkout master
git reset --hard `3c15973`
git push --force origin master
```

And now you are back in business!
