# xssencode

Converts characters from one encoding to another using a transformation. This tool will help you encode payloads in testing sql injections, XSS holes and site security.

Convert the region you selected or convert all characters.

## Support

* String <=> Base64
* String <=> Base32
* String <=> Hex
* String <=> EncodedURL
* String <=> Encoded URL All Characters
* IPv4 <=> Number
* String => HTML Entities
* String => HTML10
* String => HTML16
* (HTML Entities, HTML10, HTML16) => String
* String => MD5 (32bit, 16bit)
* String => SHA1, SHA224, SHA256, SHA384, SHA512

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

* String => MD5 (32bit, 16bit)

eg:

```
123 => 202cb962ac59075b964b07152d234b70
123 => ac59075b964b0715
```

* String => SHA1, SHA224, SHA256, SHA384, SHA512

eg:

```
123 => 40bd001563085fc35165329ea1ff5c5ecbdbbeef
123 => 78d8045d684abd2eece923758f3cd781489df3a48e1278982466017f
123 => a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3
123 => 9a0a82f0c0cf31470d7affede3406cc9aa8410671520b727044eda15b4c25532a9b5cd8aaf9cec4919d76255b6bfb00f
123 => 3c9909afec25354d551dae21590bb26e38d53f2173b8d3dc3eee4c047e7ab1c1eb8b85103e3be7ba613b31bb5c9c36214dc9f14a42fd7a2fdb84856bca5c44c2
```
