# xssencode

Converts characters from one encoding to another using a transformation. This tool will help you encode payloads in testing sql injections, XSS holes and site security.

Convert the region you selected or convert all characters.

## ChangeLog

See more at [ChangeLog](./CHANGELOG.md)

## Example Commands

You can open the command palette by pressing (`Ctrl+Shift+P` or `Cmd+Shift+P` on Mac), type xssencode and choice your action.

* String <=> Base64

eg:

```
a1@& <=> YTFAJg==
```

* String <=> Base32

eg:

```
a1@& <=> MEYUAJQ=
```

* String <=> Hex

eg:

```
abc <=> 616263
```

* String <=> EncodedURL

eg:

```
a=b&c=d <=> a%3Db%26c%3Dd
```

* String <=> Encoded URL All Characters

eg:

```
a=b&c=d <=> %61%3d%62%26%63%3d%64
```

* IPv4 <=> Number

eg:

```
192.168.1.1 <=> 3232235777
```

* String => HTML Entities

eg:

```
123!@#' => 123&excl;&commat;&num;&apos;
```

* String => HTML10

eg:

```
123!@#' => &#49;&#50;&#51;&#33;&#64;&#35;&#39;
```

* String => HTML16

eg:

```
123!@#' => &#x31;&#x32;&#x33;&#x21;&#x40;&#x23;&#x27;
```

* (HTML Entities, HTML10, HTML16) => String

eg:

```
123&excl;&commat;&num;&apos; => 123!@#'

&#49;&#50;&#51;&#33;&#64;&#35;&#39; => 123!@#'

&#x31;&#x32;&#x33;&#x21;&#x40;&#x23;&#x27; => 123!@#'
```
