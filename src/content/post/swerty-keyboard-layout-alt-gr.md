---
publishDate: 2024-06-24T18:22:00Z
title: Swerty Keyboard Layout Installation on Linux
excerpt: With working Alt-Gr
image: ~/assets/images/kbd.png

tags:
  - linux
---

Posting this so that I can look it up later when I need it again. I use this setup with my HHKB.

The Swerty keyboard layout, created by Johan E. Gustafsson, can be found [here](http://johanegustafsson.net/projects/swerty/).

## Installation

#### 1. Add Swerty Layout to Symbols

Append the contents of [se.txt](/assets/swerty/se.txt) to the end of the file `/usr/share/X11/xkb/symbols/se`:

```console
$ sudo bash -c 'cat se.txt >> /usr/share/X11/xkb/symbols/se'
```

#### 2. Modify `evdev.xml`

Edit the file `/usr/share/X11/xkb/rules/evdev.xml` and add the Swerty variant:

```xml
<layout>
  <configItem>
    <name>se</name>
    <shortDescription>Swe</shortDescription>
    <description>Sweden</description>
    <languageList><iso639Id>swe</iso639Id></languageList>
  </configItem>
  <variantList>
    <!-- Add the following variant block after <variantList> -->
    <variant>
      <configItem>
        <name>swerty</name>
        <description>Swerty</description>
      </configItem>
    </variant>
  </variantList>
</layout>
```

#### 3. Modify `evdev.lst`

Update `/usr/share/X11/xkb/rules/evdev.lst` to include the Swerty layout:

```
! variant
swerty          se: Swerty
```

Swerty should now appear as an alternative keyboard layout option for Swedish.
