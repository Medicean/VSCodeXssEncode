# xssencode

Converts characters from one encoding to another using a transformation. This tool will help you encode payloads in testing sql injections, XSS holes and site security.

Convert the region you selected or convert all characters.

## Support

* String <=> Base64, Base32, Base16
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
* String => StringFromCharCode (10 Decimal, 8 Octal, 16 Hex)
* String => PHP CHR (10 Decimal, 8 Octal, 16 Hex)
* String => Python chr (10 Decimal, 8 Octal, 16 Hex)
* String => Oracle CHR (10 Decimal, 8 Octal, 16 Hex)
* String => MySQL CHAR (10 Decimal, 8 Octal, 16 Hex)
* UnChr (StringFromCharCode, CHR, CHAR => String)
* String <=> Rot13
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

* String <=> Base16

eg:

```
abc <=> 616263
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

* String => StringFromCharCode (10 Decimal, 8 Octal, 16 Hex)

eg:

```
abc => String.fromCharCode(97,98,99)
abc => String.fromCharCode(0141,0142,0143)
abc => String.fromCharCode(0x61,0x62,0x63)
```

* String => PHP CHR (10 Decimal, 8 Octal, 16 Hex)

eg:

```
abc => ChR(97).ChR(98).cHr(99)
abc => ChR(0141).CHR(0142).cHR(0143)
abc => chr(0x61).Chr(0x62).CHr(0x63)
```

* String => Python chr (10 Decimal, 8 Octal, 16 Hex)

eg:

```
abc => chr(97)+chr(98)+chr(99)
abc => chr(0141)+chr(0142)+chr(0143)
abc => chr(0x61)+chr(0x62)+chr(0x63)
```

* String => Oracle CHR (10 Decimal, 8 Octal, 16 Hex)

eg:

```
abc => chr(97)||chR(98)||Chr(99)
abc => CHR(0141)||cHR(0142)||cHR(0143)
abc => cHR(0x61)||ChR(0x62)||chr(0x63)
```

* String => MySQL CHAR (10 Decimal, 8 Octal, 16 Hex)

eg:

```
abc => CHAr(97,98,99)
abc => ChAR(0141,0142,0143)
abc => ChAR(0x61,0x62,0x63)
```

* UnChr (StringFromCharCode, CHR, CHAR => String)

eg:

```
chr(97)+chr(98)+chr(99) => abc
ChR(97).CHR(0141).chr(0x61) => aaa
```

* String <=> Rot13

eg:

```
abc <=> nop
```
