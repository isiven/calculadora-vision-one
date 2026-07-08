import { useState, useRef, useEffect } from "react";
import { createRoot } from "react-dom/client";
import {
  AlertTriangle, BarChart3, ChevronRight, Download, FileText, Info, Mail, MessageSquare, Package,
  Plus, Search, Send, Shield, Sparkles, TrendingUp, Upload, X,
  ArrowLeft, ArrowRight, Eye, EyeOff, LockKeyhole, ShieldCheck, UserRound, UsersRound
} from "lucide-react";
import { AssistantAvatar } from "@/components/assistant/AssistantAvatar";
import { AssistantWidget } from "@/components/assistant/AssistantWidget";
import { InternalCalculatorShell } from "@/components/internal/InternalCalculatorShell";
import { InternalKpiStrip } from "@/components/internal/InternalKpiStrip";
import { InternalPricingPanel } from "@/components/internal/InternalPricingPanel";
import { InternalShell } from "@/components/internal/InternalShell";
import { InternalWorkspaceSection } from "@/components/internal/InternalWorkspaceSection";
import { AlcanceTecnicoDocument } from "@/components/pdf/AlcanceTecnicoDocument";
import {
  SUPPORT_POLICY_OPTIONS,
  getSupportPolicyScope,
  getVisionOneProductScope,
  normalizeSupportPolicy,
} from "@/data/visionOneProductScopes";
import trendAiSidebarLogo from "@/assets/trendai-sidebar-logo.png";
import trendAiElitePartnerLogo from "@/assets/trendai-elite-partner.png";
import nextcomLogo from "@/assets/nextcom-logo.png";
import nextcomLogoReverse from "@/assets/nextcom-logo-reverse.png";
import iso9001Logo from "@/assets/iso-9001.png";
import iso27001Logo from "@/assets/iso-27001.png";
import inter400Url from "@fontsource/inter/files/inter-latin-400-normal.woff2?url";
import inter500Url from "@fontsource/inter/files/inter-latin-500-normal.woff2?url";
import inter600Url from "@fontsource/inter/files/inter-latin-600-normal.woff2?url";
import inter700Url from "@fontsource/inter/files/inter-latin-700-normal.woff2?url";
import plexMono400Url from "@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-400-normal.woff2?url";
import plexMono500Url from "@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-500-normal.woff2?url";
import plexMono600Url from "@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-600-normal.woff2?url";

const TRENDAI_LOGO = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAUDBAQEAwUEBAQFBQUGBwwIBwcHBw8LCwkMEQ8SEhEPERETFhwXExQaFRERGCEYGh0dHx8fExciJCIeJBweHx7/2wBDAQUFBQcGBw4ICA4eFBEUHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/wAARCACbAZADASIAAhEBAxEB/8QAHQABAQADAQADAQAAAAAAAAAAAAgGBwkFAQIEA//EAFQQAAEDAwIDAwYHCQwHCQAAAAEAAgMEBQYHEQgSIRMxQRQiUWFxgQkyOHKRobIVFhhCUnN1grQ1NjdUV2KUorGz0tMXJHSDlaPRIyYzQ0VVhJLC/8QAGwEBAAEFAQAAAAAAAAAAAAAAAAUBAgQGBwP/xAAxEQEAAgECBAMHAwQDAAAAAAAAAQIDBBEFBiExEkFhE1FxgZGhsTLR8BQjQlKiwcL/2gAMAwEAAhEDEQA/ALLREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBF5VDfrfWZJcbBDKDWW+KGWdu/cJObl+z9YXqqkTE9l98dsc7WjbtPymN4+wi+sr2xxukfvytG52BJ+gLwbleb5ttZsYnqz4Pq6llMz/9P/qpNohdjw2yTtXb5zEfedmQItWX66a5MY59txnFuUdQxtY+V/8AWLAVrqt1z1Hxq6eQ5Ri1BFIOpikhkgc5vpa7mcCPWNwsa+rpT9UTHyTel5b1Wrj+xelp90XjdTCLXel+ruN5zIKBnPbbttv5HUOB7TbvMbh0dt6Oh9S2IvemSuSPFWd4RGr0efR5ZxZ6zW0eU/zqIiK9jCIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAsX1MzS2YNjM12r3B8pBZS0wOzqiXbo0erxJ8Asb1O1jx7DTLQxw1Fxu4BDadsbo2A+lz3Dbb5u5UrZzlt7zK+Pu17qe1l25YomdI4Wfksb4D6z4rA1Wuriia162/DceXuU8+vvXNqI8OLv62+Hp6/R7OFajXixakvzGqe6qkrJXfdGMHbto3EbtHo5dhy+jlAVnY/d7ffrPTXa1VLKmjqWB8UjfEeg+gjuI8CufSzfSrUq+YDXk0n+uWyZ3NUUMjtmuP5TD+I/19x8QVH6PWeyna/aW58zcrxxHHGXTREZKxtt2iYjtHpMeX0n0txFh2nWo+N5zTg2mWoZUtG8tPNC5roz4+cByn3FZip2l63jes7w5FqNNm02ScWas1tHlIsfz7EbRmePTWi7QNcHAmGYDz4H7dHtPgR9Y6FZAh7lW1YtG0rcObJgyRkxztaOsS5+3CmuOOZJPSOlfTXG21bmdpGdiySN2wc0+0bhW9pjkRyvA7RfpA1s1VTjtgO4SNJa/+sCpC1vkil1byZ0O3L5cWnb8oNaHfWCqW4ZYJIdHbSZAQJZJ5GfNMrtv7FD8P3rmtSO37S6ZznWuo4Vp9VeNrzMf8q7zH1h+/WXVbGNKbVQ3LJ4rjJBXTmCLyOFsjg4N5uoLhsNlq/8ADI0k/iuT/wBAj/zE468HyzOMMx6ixOx1V2qKe4vlmZBy7saYiATuR4qRPwe9Zv5P7t/y/wDEply5Xf4ZGkn8Vyf+gR/5ifhkaSfxXJ/6BH/mKF87wXLcGq6alyyx1VpmqozJCyfl3e0HYkbE+K/LhmK5DmN6bZsZtU9zuDo3SiCHbmLW956kdyC8vwyNJP4rk/8AQI/8xZ9ozrfhuq9xuFDi8N2jloIWTTGsp2xgtc4gbbOO53Cgb8HvWb+T+7f8v/EqS4EtN84wXJsmqctxuttENVRQsgfPy7PcJCSBsT4FBWqIiAiIgIiICIm49IQEREBERAREQFPNdxf6U0dbPRzUuTdpBI6N+1CzbdpIO3/aepUMVx7yz99N1/22b+8cg6v6ZZrZ9QsMo8ssLKtlvrDIIhVRhknmPLDuAT4tPislWlOCD5NeNfPq/wBpkW60H1mkjhifLK9rI2NLnOcdg0DqSVPE3GLpHHM+MQZJIGuID2ULOV2x7xvJ3Fe9xoZ0cK0QuUVNN2dxvZ+5tNsdiA8HtXe6MOG/pcFzSQdTtGNbMK1YqblS4wbjHUW9jJJYq2ARuc15IDm7OduARsfRuPStlLl7woZz94etlluE83Z2+uf9z67c7DspSAHH1NfyO9xXUIIC0pqLxNac4JmdwxS909+dcKBzGzGno2PjJcxrxsS8b9HDwW6z3LmPxl/KTy787T/s8SC9dF9YMU1Zhuk2LxXONtsdE2fy2Bse5kDi3l2c7f4h39y9m55pHb8ofYZrBeXOZSvrDVsEHYdizbmfuZOboSG7cu+57tuqmf4NH9ys5/P0X2ZlU92xqjuV2luU007ZJbZNbS1pHL2crmuLu743mjbwQeVjupGMX+vstDbJqmWou9DJWxsMJBgYzYFs2/8A4b9yRynrux3oWYLGbXhFltlxt1fRRmGoo2OD3sa0Gqc6GOHtJSB5zuSJg39SyZAREQEREBEXm5TeqPHcdr73cHctNRQulft3u27mj1k7AesqkzERvK/HS2S0UrG8z0h9Mnx2y5NbH22+W6Ctp3Dukb1YfS13e0+sKTNatKq7A6zy6jdJWWGd/LFO4efA490cm31O7j6j3/Wxa0ZpbMuqb3JWuq6arnMk9umeTCGnuaz8ggAAEejqCqms1wx/UTBhUMjZWWu5QmOaGQdWnucxw8HNP1gEeCjZnDromI6WhvmKvEuU8lL5J8WG3eI7b+fwn3eU/iEFu/QzRY5DBBkeVxyRWp+z6ajBLX1I8HOPe1h8AOrvUO/4wbRt51mr7LdmOnstnLakvcOlSx53hYfbseb5hHiqkY1rGBjGhrQNgANgAvDRaLeZtkjt5JTmnmv2VK4NFbraImbR5RPWIj1mPp8e357ZQUVsoo6K3UkFJTRDZkULAxrR6gF+lEU12cttabTvM9Redkt3pbDj9dea14bT0cDpn7nv5Rvt7Sdh716Kmvip1BZWTjB7TOHRQPElykYejpB1bF7u8+vYeBXhqM0Ycc2lLcE4Xfiesrgr272n3R5/tHq0dM+vv9/fIGumr7lVFwaOpdLI/u+lyu/DrNFj2LWyyQ7FlFTMh3H4xA6n3nc+9Tpwq4K+5312ZXCH/Ure4sog4dJJ9ti4epgP0n1KoVh8NwzWs5J82zc88Tplz00eLtj7/GfL5R+QgHvXxsPQF8opNoSGPhJQBnOK7D/0yX++WHcA3XiDpd//AG2q+yFmPwkv7+cV/Rkv98sO4BflB0v6NqvshB0X2HoC52a7a16qWLWPLbPac3utJQUl1nhp4GObyxsDujR5vcF0UK5VcSn8Peb/AKaqPtINn/hY5vQ6T22wW+tkqcodJOa+81kbXuZGXkxtjbtyl2x6uI2AA2BPUawh1f1Sr71BLU6hZM4yTMDg25SMbtzDpytIAHuX6uHnR+86vZZLbaOobQWyia2S4Vzmc4ia47Na1vTme7Y7DcDYEnuVjWPhB0mt0MPlH3dr6iPZxmlruTdw8dmNACDcOoma2DAMPqsnySr8noqZoADRvJM8/FjY38Zx8B7SdgCVBuqXFhqVlFxmjxusGLWrmIiipA107m+BfKRvv83lHtXr/CCZxU3nVGDDIJ3C3WCnYXxg9HVMrQ5zj6dmFjR6PO9K8zgy0dsGot5uN+zB7ZLJaXsjZRmbs/Kp3Au2cQQeRoG5A23Lh123Qayj1f1UjqBUN1EyntAd+t0lI39hdst16JcXeVWa5U9s1FcL5Z3uDH1zYg2rph+UeUASNHiCOb0E9xq+4aU6O11oNqnwrFRTFvKOypYo3t9Ye3ZwPrB3XPjiV06pdMtUquw2yqdU2qeJlZQPc8OeInkjkcR3lrmuG/iAD4oOmVfd6euwmpvdmrWT081vfU0lTC7drmmMua9p+grmh+EBrL3f6Qbz3flM/wAKpHgazGpvGieXYjWTGQ2KKSSm5j1bBNHIeUeoPa8/rKICgprO+LrM6rGLRZMSeKCpit0Edyu08TX1E9SIwJCxp3axvNv1IJPf5q09PrBqpNWeVyah5R2u++4ucrR9AO31LdnCHw5WnPrC7Ns3NQ+0PldFQUMMhj8p5Ds+R7x1DAd2gN2JIPXYddv6y8Kentxwmunwm0vsl9pYHS0pjqJJI6hzQT2b2vcfjbbcw2IJB6jog1Lw7cVmS2/IqOwakV4ulmqpGxC5StDZ6Qk7Bz3DYPZueu45gOu522N2NcHNDgQQe4hcadiHbHor/rtUK+2cCtBlkVS8Xae1x2uCbfZ4m5zTl+/5Qa1zt/SEGNcSfFdUWO9VWJ6aimlqKV5iq7vK0SsbIOhbC09HbHoXu3G++wPepiuWs2q9xqnVNTqHkvaO6kRV74mj2NYQB7gsGpoJquripqeN8s0zwyNjRuXOJ2AHrJKv3SXhGwG043TSZ1SzX69yxh9S3yl8UEDiOrGBhBdt3czid+/YdyCcdMOKLVDErpAbveJcmtXOO3pLgQ+Qt8eSXbna7bu3JHpC0ve6qOuvVbWxNc2OoqJJWtd3gOcSAfX1Vr8QPCbizcRrr9pxBU265UMTpzb3TumiqmNG7mt5yXNfsDt1IPdsN9xDvig6WcEHya8a+fV/tMi3WtKcEHya8a+fV/tMi2bqHk1HhuD3nKK8jsLZSPqC0nbncB5rB63O2aPaghLj7zj749XWY1Szc9DjkHYEA9DUybPlPuHI32tK/rwTaU02e/flcbtCDQttUlrp3ubuG1FQ0+ePWxo3/XCnq+XOsvV7rbvcJTLWVtRJUVDz+M97i5x+kldNuFHCfvF0Qsduni7OvrY/uhWgjY9rMA4NPrazkb+qg5kXi31dovFXa66Mw1dFO+nnYe9j2OLXD3EFdQ+GbN/v/wBGLDfJpe0ro4fI6709vF5rifnDlf8ArKMeO/CzjOtc15p4uSiyGAVrCO4TDzJh7dw1x+esw+Dqzn7n5dd8Dq5toLrF5ZRtJ6CeIbPA9bo+v+7QXOe5cx+Mv5SeXfnaf9niXTg9y5j8Zfyk8u/O0/7PEg3t8Gj+5Wc/n6L7MysJR78Gj+5Wc/n6L7MysJAREQEREBERAWhuMDIX01htWNQSbGuldU1AB7449g0ewudv+qt8qTOLapkl1Pp4HE8kFsiDf1nyErC195rgnbzbTybpq5+K0m3asTb6dvvO7T6qrhGs9dQ4LW3SpmkFPcqvmpoT8UNYOQvHrcdx7GhSoTs0kd4G6vLTKjgodO8epacARstsBG3iSwEn3klR/DKeLLNvc3XnzVzi0FcMf52+0dfzs95kELKiSobEwSyNa17wOrg3fYH2bn6V/REU65FMzPcRfzqZ4aaB89RNHDDG0ufJI4Na0DvJJ6ALQGr+vUMcU1lwWUSyuBZLdNvNZ6eyB+Mf5x6Dw37145s9MNd7SkuGcJ1XE8vs9PXf3z5R8Z/ksh181agxWklx+wTslv0zdpJGncUTT4n+efAeHefAGfdL8JumoGVNoIHSsp2u7WvrHed2TCep3Pe93XYeJ69wK+NO8IyDUG/ugoQ/sg/nra+bdzIt+pLj+M8+A7z47DqrGwPErPhmPxWezwckbfOlld1fM/xe8+JP1dwUZSl9bk8d+lYb7q9XpeVtJOl0s+LPbvPu9Z/8x859fRsFpoLFZqW0WynbT0dLGI4ox4Aen0k95PiSv3IimIiIjaHMb3te02tO8yIiKq1DHwkv7+cV/Rkv98sO4BflB0v6NqvshZj8JL+/nFf0ZL/fLDuAX5QdL+jar7IQdGCuVXEp/D3m/wCmqj7S6qlcquJT+HvN/wBNVH2kFZfBwU0LNKb/AFbWATS3sse7xLWwR8o93M76VUbvilTF8HJ/A7ev09J/cQqnUHLfiuEg4iM07Xfm+6HTf8nkZy/VssbwvTvPMwt81fiuMXS7UsMvYyy0sRc1r9geU+vYg+9bw+EGwWqs+ptPm0EDjbr7AyOWQDoypibylp9G7A0j07O9CxLhQ1vbpJf62lvFLPWY9dOTylsABlgkbuGytB2B6EhzdxuNj4bEMZ/0Hax/yfZF/Rj/ANV8O0M1hcd3aeZCfbSn/qriqOKfROK2eWMyeaZ/LuKaO3T9qT6Ni0Df2nb1qcsz4yM9qcmrJcUobXQWUvApIayl7WYNA23e4O23J3Ow6DfbrtuQzHg10+zXDKTUGpyrHLjZ4amziOE1UXJ2jgJCdvTsP7VGXiF0X4c84z/UXSDJcpzRtCylljmgtopqXsudrIndo89TuOYho9bXLnR4hB1M4W4Y4OHzCmRNDWm1seR63EuP1krZZ7lrjhj/AIAMJ/REP9hWxyg475G1rchuLWgBoq5QAPDzyqRzJsp+D2w8s35BfnF+3o7Wq2+vZTfk3747l/tcv2yrW07wufPeAKHH6KLta/s6mpomDvdNFVPe1o9bti39ZBJWhppW6y4Y6t5fJxfaPn5u7btm966zBcbGPnpKpsjHSQzwvBaRu1zHA/UQQrk0o4xsWnxynpNQaSvobxBG1ktVSwdtDUkDbn2B5mOPeRsR6D4IKsnfHHC98zmtja0l5d3AeO/uXHa9Pp5LzWvpABTuqJDEP5pcdvq2VccQ/Fna75iVbi2ndLXtdcIjBVXOqYIuSJw2c2Jm5PMR05jtsCdhv1EeeKDpZwQfJrxr59X+0yLXPwi2ceQYlZ8CpJdp7pL5bWAHqIIjswH1Ok6/7tbF4IiBw042SdgH1fX/AOTIob4ls4OoGsl9vsUvaULJvJKDr07CLzWkfOPM/wDWQYJYqunoL1Q11XRMrqenqI5ZaZ7y1szWuBLCR1AO22/rVi27jhpBABW6cyteB/5F1Bb9cfRad0L4ccj1XwuryW33qhtccVWaWCOrieROWtBc7mbvsAXAdx8fQshqeDTVaOYtiuGLzMHc8Vsrd/cY0Hh8Sev8GsVmt1tOGx2l9vqTNDVGuM0mzm8rmbcjQAfNPtaFqjTzJazDs4s2UUJPb2ysjqA0Hbna0+cz2Obu33qhbJwU59UOabvk2O0Ee/ndiZZ3AezlaD9KnXNsersSy+641chtV2yrkppCBsHFriA4eojYj1FB1zslyo7zZaK72+UTUdbTsqIJB3Oje0OafoIXNPjL+Unl352n/Z4lVvAPnAyTR92OVU3PXY5P5OAT1NO/d8R9x52+xoUpcZfyk8u/O0/7PEg3t8Gj+5Wc/n6L7MysJR78Gj+5Wc/n6L7MysJAREQEREBERAUycYdmkhyOzX5rD2NTSupXuHg9ji4b+1rj9BVNrHtQ8St2a4tU2K47sbJs+GZo3dDIPivHs9HiCR4rH1WH22Kax3TXL/Eq8N19M9/09p+E/t3QaqP0J1nslFjdLjOWVJoZKJgipqx4JjkjHxWvI+K4Dpv3EALTud6d5Xh1bJFdLZNJStO0dbTsL4JB6eYfF9jtisRL2A7F7QfnBQOPJk0199urseu0Gi47pYrNvFXvE1ntP87xK6Z9SMChg7d+X2Xk236VbXH6Ad1g2X8QuI2yN8dhhqb3U/iua0wwg+tzhufcFLdstlyucwittuq62QnYNp4HSH+qFsjENCc5vj2SV9NFY6U976x28m3qjb139pCzY1uoy9MdWqW5U4Lw6fHrM0zHumYj7R1n5Mc1C1IyrN5S271vZUIduyhp92Qt9G473n1uJ9WyyzSfRG95Q+G539s1osx2cA5vLUVA/mtPxQfyj7ge9bw080bxDEXR1ZpzdrmzqKuraDyH0sZ8Vvt6n1rY69cWgm1vHmneUfxHnHFgxf03CqeCv+2230j/ALnr6POxyx2rHbRDabNRRUdHCPNjYO8+JJ7yT4k9SvRRFJxERG0Of3vbJabXneZ8xERVWiIiCWeNPRzPtTMqsFfiFqgraejoZIZ3SVkcJa4ycwGzyN+ixzhM0H1L0+1fp8hyiy09JbmUVRE6RldFKQ5wAaOVrifBWSiAoK1p4bdW8m1ZyjILRYKWa33C5zVFNI64wsLmOduDsXbj2FXqiDR3Bnp5lWm2nNzs2XUEVFWT3Z9TGyOoZKDGYo2g7sJA6tPRbxREHhZ7iNgzjFqvG8koW1lvqm7OaTs5jh8V7Hd7XA9QR/ZuFEOpXBznVprppsKrKTIbcSTFHLK2nqmj0ODtmO9oI39AV9og5gxcN+tklR2AwOta7f4zqiAN/wDtz7Lb2kvBpe6m4Q1+o9zp6GhY4Odb6CXtJ5dvxXSDzWA+lvMfZ3q4Nh6AiDxJ7FSUGFTY9YqGGlpoqB9LSU0QDWMHIWtaPR4dVz2/BQ1s3H/dqj/4pT/4l0kRBhmh1hueL6R4xj15gbBcKC3xwVEbZA8NeO8cw6H3LMyiIOc164V9aKq81tTFjlIY5aiR7D904BuC4kfjetWbww4lfcH0VsmM5JSspbnSOn7aJkrZAOaZ7m+c0kHoQtmIglriQ4VKfMbxVZZgdVS2y71LjJV0E+7aepee97XAHs3nxGxaT16Hfeaa/hr1rpKs0xwaqmO+wfDUwPYfXzB/T3rp2mw9CCCNJ+DzNLtdaeqz2WnsNqY4Omp4p2zVUrfyRy7sZv3cxJI9BWPX7hQ1d+7tf9ycapPuf5TJ5LvdId+y5zyd7t/i7d/VdGEQaAwjCtSMR4RXYVbbTF9+LoammjhbWRBsQmnfvJ2m/LuI3lw69+wUtfgoa2b/AL2qP/ilP/iXSREGHaLYdHgOl1gxRrWCWipGipc3udO7zpXb+O73O92yzFEQFH3F1w8Zlm2p7crwa2U1XHXUjG17X1UcJbOzzQ7zyN92Bnd+SVYKII54TdH9YtL9UW3G8WGCOxV9M+luBZcYXlg+Mx4aHbkh4A6eDivE4keHnVTNdashybH7HTVFsrZIjBK64QxlwbCxp81zgR1aVcKIJz4JtLM00xocphzC2w0TrhLSupuzqo5uYMEgdvyE7fGb3qjERAREQEREBERAREQCARsRuCvwyWa0SSdpJa6Jz+/mdTsJ+nZfuRUmIldW9q/pnZ9IYooWBkUbI2Dua1oA+pfdEVVszuIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiD/2Q==";

const CATALOG = [
  // Vision One Credits (the credit pool itself)
  { cat:"Vision One Credits", id:"AK", name:"Trend Vision One Credits", credits:1, unit:"crédito", sku:"VORN0309" },

  // Cyber Risk Exposure Management
  { cat:"Cyber Risk Exposure Management", id:"A", name:"Cyber Risk Exposure Management - Core", credits:20, unit:"dispositivo evaluado o activo de red", sku:"VORN0150" },
  { cat:"Cyber Risk Exposure Management", id:"B", name:"Cyber Risk Exposure Management - Essentials (device)", credits:50, unit:"dispositivo evaluado" },
  { cat:"Cyber Risk Exposure Management", id:"C", name:"Cyber Risk Exposure Management - Essentials (network assets)", credits:20, unit:"activo de red evaluado" },

  // Cloud Risk Management
  { cat:"Cloud Risk Management", id:"D", name:"Cloud Risk Management 1-500 Resources or cloud assets", credits:1000, unit:"cuenta cloud", sku:"VORN0256" },
  { cat:"Cloud Risk Management", id:"E", name:"Cloud Risk Management 501-1000 Resources or cloud assets", credits:2000, unit:"cuenta cloud" },
  { cat:"Cloud Risk Management", id:"F", name:"Cloud Risk Management 1001-1500 Resources or cloud assets", credits:3000, unit:"cuenta cloud" },
  { cat:"Cloud Risk Management", id:"G", name:"Cloud Risk Management 1501-2000 Resources or cloud assets", credits:4000, unit:"cuenta cloud" },
  { cat:"Cloud Risk Management", id:"H", name:"Cloud Risk Management 2001-2500 Resources or cloud assets", credits:5000, unit:"cuenta cloud" },
  { cat:"Cloud Risk Management", id:"I", name:"Cloud Risk Management 2501-3000 Resources or cloud assets", credits:6000, unit:"cuenta cloud" },
  { cat:"Cloud Risk Management", id:"J", name:"Cloud Risk Management 3001-3500 Resources or cloud assets", credits:7000, unit:"cuenta cloud" },
  { cat:"Cloud Risk Management", id:"K", name:"Cloud Risk Management 3501+ Resources or cloud assets", credits:8000, unit:"cuenta cloud" },

  // Security Operations
  { cat:"Security Operations", id:"L", name:"Agentic SIEM - Analytic Data Ingestion", credits:3, unit:"GB de datos ingeridos por día" },
  { cat:"Security Operations", id:"M", name:"Agentic SIEM - Archival Data Ingestion", credits:1, unit:"GB de datos ingeridos por día" },
  { cat:"Security Operations", id:"N", name:"Agentic SIEM - Analytic Data Retention", credits:2.4, unit:"GB por mes de retención" },
  { cat:"Security Operations", id:"O", name:"Agentic SIEM - Archival Data Retention", credits:0.6, unit:"GB por mes de retención" },
  { cat:"Security Operations", id:"P", name:"Forensics", credits:400, unit:"GB de almacenamiento" },
  { cat:"Security Operations", id:"Q", name:"Data Pipeline (Outbound)", credits:800, unit:"TB exportado" },
  { cat:"Security Operations", id:"R", name:"XDR for Endpoints (EDR)", credits:20, unit:"endpoint" },
  { cat:"Security Operations", id:"S", name:"XDR for Email (EmDR)", credits:5, unit:"usuario" },
  { cat:"Security Operations", id:"T", name:"XDR for Networks (NDR) - Deep Discovery Inspector", credits:12500, unit:"500Mbps de tráfico" },
  { cat:"Security Operations", id:"U", name:"XDR for Networks (NDR)", credits:12500, unit:"500Mbps de tráfico" },
  { cat:"Security Operations", id:"V", name:"XDR for Cloud (CDR)", credits:3, unit:"GB de datos" },

  // Threat Intelligence
  { cat:"Threat Intelligence", id:"X", name:"Sandbox Analysis - Manual Submission", credits:2, unit:"submission" },
  { cat:"Threat Intelligence", id:"Y", name:"Sandbox Analysis - Auto Submission con ZTSA Internet Access", credits:7, unit:"usuario" },
  { cat:"Threat Intelligence", id:"Z", name:"Sandbox Analysis - Auto Submission con Networks", credits:2000, unit:"500Mbps de tráfico" },
  { cat:"Threat Intelligence", id:"a", name:"Sandbox Analysis - Auto Submission con Endpoint Security", credits:7, unit:"endpoint" },
  { cat:"Threat Intelligence", id:"b", name:"Threat Intelligence", credits:80000, unit:"V1 tenant" },
  { cat:"Threat Intelligence", id:"c", name:"Threat Intelligence for Service Providers (V1 xSP)", credits:500000, unit:"V1 tenant" },

  // Cloud Security
  { cat:"Cloud Security", id:"d", name:"Container Security - Kubernetes node o Amazon ECS instance", credits:1100, unit:"nodo o instancia" },
  { cat:"Cloud Security", id:"e", name:"Container Security - Serverless container pod o task", credits:110, unit:"pod o task serverless" },
  { cat:"Cloud Security", id:"f", name:"Container Security - Custom Rule Detection", credits:3, unit:"GB de datos" },
  { cat:"Cloud Security", id:"g", name:"File Security Virtual Appliance - scans", credits:5000, unit:"500K scans" },
  { cat:"Cloud Security", id:"i", name:"File Security Virtual Appliance - scanner (5TB)", credits:6000, unit:"scanner" },
  { cat:"Cloud Security", id:"j", name:"File Security Containerized Scanning - scans", credits:5000, unit:"500K scans" },
  { cat:"Cloud Security", id:"l", name:"File Security Containerized Scanning - scanner (5TB)", credits:6000, unit:"scanner" },
  { cat:"Cloud Security", id:"m", name:"File Security SDK - scans", credits:5000, unit:"500K scans" },
  { cat:"Cloud Security", id:"o", name:"File Security Storage - scans", credits:5000, unit:"500K scans" },
  { cat:"Cloud Security", id:"q", name:"File Security Storage - bucket", credits:9636, unit:"bucket reservado" },

  // Endpoint Security
  { cat:"Endpoint Security", id:"r", name:"Endpoint Security Core", credits:45, unit:"endpoint", sku:"VORN0034" },
  { cat:"Endpoint Security", id:"s", name:"Endpoint Security Essentials", credits:65, unit:"endpoint" },
  { cat:"Endpoint Security", id:"t", name:"Endpoint Security Pro", credits:300, unit:"endpoint", sku:"VORN0051" },
  { cat:"Endpoint Security", id:"u", name:"SAP Scanner for Endpoint Security Pro", credits:4800, unit:"servidor SAP" },
  { cat:"Endpoint Security", id:"v", name:"Mobile Security", credits:5, unit:"dispositivo móvil" },

  // Email and Collaboration Security
  { cat:"Email and Collaboration Security", id:"x", name:"Email and Collaboration Security Core", credits:25, unit:"usuario", sku:"VORN0175" },
  { cat:"Email and Collaboration Security", id:"y", name:"Email and Collaboration Security Essentials", credits:50, unit:"usuario" },
  { cat:"Email and Collaboration Security", id:"z", name:"Email and Collaboration Security Pro", credits:105, unit:"usuario" },

  // Zero Trust Secure Access (Network Security)
  { cat:"Zero Trust Secure Access", id:"AA", name:"Zero Trust Secure Access - Internet + Private Access", credits:110, unit:"usuario" },
  { cat:"Zero Trust Secure Access", id:"AB", name:"Zero Trust Secure Access - Internet Access", credits:60, unit:"usuario" },
  { cat:"Zero Trust Secure Access", id:"AC", name:"Zero Trust Secure Access - Private Access", credits:50, unit:"usuario" },
  { cat:"Zero Trust Secure Access", id:"AD", name:"Zero Trust Secure Access - AI Service Access", credits:50, unit:"usuario" },
  { cat:"Zero Trust Secure Access", id:"AE", name:"Zero Trust Secure Access - Internet + AI Service Access", credits:85, unit:"usuario" },
  { cat:"Zero Trust Secure Access", id:"AF", name:"Zero Trust Secure Access - Outbound Static IP Add-on", credits:4000, unit:"256Mbps de bandwidth" },

  // Data Security
  { cat:"Data Security", id:"AG", name:"Data Security - Endpoint", credits:30, unit:"endpoint" },

  // AI Security
  { cat:"AI Security", id:"AH", name:"AI Application Security - Private Cloud", credits:7200, unit:"instancia private cloud" },
  { cat:"AI Security", id:"AI", name:"AI Application Security - SaaS", credits:9600, unit:"5,000 API usage diario" },
  { cat:"AI Security", id:"AJ", name:"AI Security Package", credits:1200, unit:"empleado total" },
];

const fmt  = n => n.toLocaleString("en-US");
const fmtU = n => "$" + n.toLocaleString("en-US", { minimumFractionDigits:2, maximumFractionDigits:2 });
const mono = { fontFamily:"'JetBrains Mono','SF Mono','Fira Mono',monospace" };

const CATS = [...new Set(CATALOG.map(p => p.cat))];

// Friendly descriptions for client-facing view (id → description in plain Spanish)
const CLIENT_DESC = {
  "AK": "Pool de créditos prepagados que se consumen según los productos activados",
  "A": "Identifica y prioriza riesgos de seguridad en dispositivos y red",
  "B": "Análisis avanzado de exposición al riesgo en dispositivos",
  "C": "Análisis avanzado de exposición al riesgo en infraestructura de red",
  "D": "Análisis de riesgo en cuentas cloud con menos de 500 recursos",
  "E": "Análisis de riesgo en cuentas cloud con 501-1000 recursos",
  "F": "Análisis de riesgo en cuentas cloud con 1001-1500 recursos",
  "G": "Análisis de riesgo en cuentas cloud con 1501-2000 recursos",
  "H": "Análisis de riesgo en cuentas cloud con 2001-2500 recursos",
  "I": "Análisis de riesgo en cuentas cloud con 2501-3000 recursos",
  "J": "Análisis de riesgo en cuentas cloud con 3001-3500 recursos",
  "K": "Análisis de riesgo en cuentas cloud con 3501+ recursos",
  "L": "Ingesta de logs en SIEM para análisis avanzado",
  "M": "Ingesta de logs en SIEM para archivado",
  "N": "Retención de datos analíticos en SIEM",
  "O": "Retención de datos archivados en SIEM",
  "P": "Almacenamiento de paquetes forenses para investigaciones",
  "Q": "Exportación de datos a sistemas externos",
  "R": "Detección y respuesta avanzada en endpoints (EDR)",
  "S": "Detección y respuesta avanzada en correo electrónico",
  "T": "Detección y respuesta en redes con Deep Discovery Inspector",
  "U": "Detección y respuesta en redes basada en bandwidth",
  "V": "Detección y respuesta en infraestructura cloud",
  "X": "Análisis manual de archivos sospechosos en sandbox",
  "Y": "Análisis automático de URLs sospechosas vía ZTSA Internet",
  "Z": "Análisis automático de tráfico de red en sandbox",
  "a": "Análisis automático de archivos desde endpoints en sandbox",
  "b": "Inteligencia de amenazas para tu organización",
  "c": "Inteligencia de amenazas para proveedores de servicios (MSSP)",
  "d": "Protección de nodos Kubernetes y contenedores ECS",
  "e": "Protección de pods y tasks serverless",
  "f": "Detección personalizada en contenedores",
  "g": "Escaneo de archivos vía Virtual Appliance",
  "i": "Scanner dedicado de Virtual Appliance (5TB)",
  "j": "Escaneo de archivos containerizado",
  "l": "Scanner containerizado dedicado (5TB)",
  "m": "Integración SDK para escaneo de archivos en aplicaciones propias",
  "o": "Escaneo de archivos en almacenamiento cloud",
  "q": "Bucket reservado para File Security Storage",
  "r": "Protección antivirus y EDR para equipos y servidores",
  "s": "Endpoint Security con XDR incluido",
  "t": "Endpoint Security empresarial con XDR + funciones avanzadas",
  "u": "Escaneo de servidores SAP con NetWeaver",
  "v": "Protección antivirus para dispositivos móviles (iOS/Android)",
  "x": "Filtro antispam, antiphishing y protección de correo (Microsoft 365 / Google)",
  "y": "Email Security con XDR incluido",
  "z": "Email Security empresarial con XDR + DLP + funciones avanzadas",
  "AA": "Acceso seguro Zero Trust para internet y aplicaciones internas",
  "AB": "Acceso seguro Zero Trust para navegación web",
  "AC": "Acceso seguro Zero Trust para aplicaciones internas (reemplaza VPN)",
  "AD": "Acceso seguro Zero Trust para servicios de IA generativa (ChatGPT, etc.)",
  "AE": "Acceso seguro Zero Trust para internet + servicios de IA",
  "AF": "IPs estáticas dedicadas para tráfico saliente de ZTSA",
  "AG": "Prevención de pérdida de datos (DLP) en endpoints",
  "AH": "Seguridad para aplicaciones de IA en infraestructura privada",
  "AI": "Seguridad para aplicaciones de IA en SaaS",
  "AJ": "Paquete completo de seguridad para IA empresarial",
};

const CAT_ICONS = {
  "Vision One Credits": "🪙",
  "Endpoint Security": "💻",
  "Email and Collaboration Security": "📧",
  "Cyber Risk Exposure Management": "🎯",
  "Cloud Risk Management": "☁️",
  "Security Operations": "🔍",
  "Threat Intelligence": "🛡️",
  "Cloud Security": "🌐",
  "Zero Trust Secure Access": "🔐",
  "Data Security": "🔒",
  "AI Security": "🤖",
};

// Calculate months between two date strings (YYYY-MM-DD), rounded to 1 decimal
function monthsBetween(startDate, endDate) {
  if (!startDate || !endDate) return 12; // default to 1 year
  const s = new Date(startDate);
  const e = new Date(endDate);
  if (isNaN(s) || isNaN(e) || e <= s) return 12;
  // More precise: days / 30.4375 (average month length)
  const days = (e - s) / (1000 * 60 * 60 * 24);
  return Math.round((days / 30.4375) * 10) / 10;
}

// Default fill for lines: start = today, end = today + 1 year
function defaultDates() {
  const today = new Date();
  const nextYear = new Date(today);
  nextYear.setFullYear(today.getFullYear() + 1);
  const fmt = d => d.toISOString().split("T")[0];
  return { startDate: fmt(today), date: fmt(nextYear) };
}

// ════════════════════════════════════════════════════════════════════════
// AUDIT ENGINE — compara consumo real vs propuesta comprada
// Detecta saltos de tier (ej. compraste Core, usas Pro), productos no
// contemplados, productos no usados, y oportunidades de optimización.
// Basado en documentación oficial de Trend Vision One Credit Allocation.
// ════════════════════════════════════════════════════════════════════════

// Familias de productos donde existe escalamiento de tier (Core → Essentials → Pro)
const PRODUCT_FAMILIES = {
  endpoint: {
    name: "Endpoint Security",
    tiers: [
      { id: "r", name: "Core",       credits: 45 },
      { id: "s", name: "Essentials", credits: 65 },
      { id: "t", name: "Pro",        credits: 300 },
    ],
  },
  email: {
    name: "Email & Collaboration Security",
    tiers: [
      { id: "x", name: "Core",       credits: 25 },
      { id: "y", name: "Essentials", credits: 50 },
      { id: "z", name: "Pro",        credits: 105 },
    ],
  },
  crem: {
    name: "Cyber Risk Exposure Management",
    tiers: [
      { id: "A", name: "Core",       credits: 20 },
      { id: "B", name: "Essentials", credits: 50 },
      { id: "C", name: "Pro",        credits: 100 },
    ],
  },
};

// Reverse lookup: prodId → family info
function findFamily(prodId) {
  for (const [key, fam] of Object.entries(PRODUCT_FAMILIES)) {
    const tier = fam.tiers.find(t => t.id === prodId);
    if (tier) return { familyKey: key, family: fam, tier, tierIdx: fam.tiers.indexOf(tier) };
  }
  return null;
}

/**
 * Compara propuesta (lo comprado) vs consumo (lo usado).
 *
 * Args:
 *   proposalItems: [{ prodId, qty, totalCredits, sourceFile, ... }]
 *   usageItems: [{ prodId, monthly, sourceFile, ... }]
 *   proposalTotalPool: número (pool total comprado)
 *
 * Returns:
 *   {
 *     tierEscalations: [{family, boughtTier, usedTier, qtyImpacted, extraCreditsAnnual}],
 *     unplannedProducts: [{prodId, monthlyUsage, annualUsage, prod}],
 *     unusedProducts: [{prodId, qtyBought, prod}],
 *     totalUnallocated: número,
 *     totalAnnualUsage: número,
 *     totalProposalEffective: número,
 *     hasFindings: bool
 *   }
 */
function auditUsageVsProposal(proposalItems, usageItems, proposalTotalPool) {
  const result = {
    familyAnalysis: [],
    tierEscalations: [],
    unplannedProducts: [],
    unusedProducts: [],
    totalUnallocated: 0,
    totalDeficit: 0,
    isOverPool: false,
    totalAnnualUsage: 0,
    totalProposalEffective: 0,
    hasFindings: false,
  };

  // Calcular totales
  let usageAnnual = 0;
  usageItems.forEach(it => { usageAnnual += (Number(it.monthly) || 0) * 12; });
  let proposalSum = 0;
  proposalItems.forEach(it => { proposalSum += Number(it.totalCredits) || 0; });

  // proposalTotalPool viene como el EFFECTIVE TOTAL ya calculado por el código del cliente
  // (suma de pool standalone + productos individuales, evitando doble conteo).
  // Por lo tanto, lo usamos directamente como la fuente de verdad.
  const proposalEffective = Number(proposalTotalPool) || 0;

  result.totalAnnualUsage = usageAnnual;
  result.totalProposalEffective = proposalEffective;
  result.totalUnallocated = Math.max(0, proposalEffective - usageAnnual);
  result.totalDeficit = Math.max(0, usageAnnual - proposalEffective);
  result.isOverPool = usageAnnual > proposalEffective;

  // ═══ Detección 1: Análisis por familia (Endpoint, Email, CREM) ═══
  // Para cada familia, calcular cuánto se compró/usó EN CADA TIER
  result.familyAnalysis = [];

  Object.entries(PRODUCT_FAMILIES).forEach(([famKey, fam]) => {
    const familyTierIds = fam.tiers.map(t => t.id);

    // Comprado por tier (cantidad de unidades + créditos)
    const boughtByTier = {};
    fam.tiers.forEach(t => {
      boughtByTier[t.id] = { qty: 0, credits: 0, tier: t };
    });
    proposalItems.forEach(it => {
      if (familyTierIds.includes(it.prodId)) {
        const qty = Number(it.qty) || 0;
        boughtByTier[it.prodId].qty += qty;
        boughtByTier[it.prodId].credits += qty * boughtByTier[it.prodId].tier.credits;
      }
    });

    // Usado por tier (calcular qty equivalente desde créditos anuales)
    const usedByTier = {};
    fam.tiers.forEach(t => {
      usedByTier[t.id] = { qty: 0, credits: 0, tier: t };
    });
    usageItems.forEach(it => {
      if (familyTierIds.includes(it.prodId)) {
        const tier = fam.tiers.find(t => t.id === it.prodId);
        if (tier && tier.credits > 0) {
          const annualCredits = (Number(it.monthly) || 0) * 12;
          usedByTier[it.prodId].qty += annualCredits / tier.credits;
          usedByTier[it.prodId].credits += annualCredits;
        }
      }
    });

    // Totales de la familia
    const totalBoughtCredits = fam.tiers.reduce((s, t) => s + boughtByTier[t.id].credits, 0);
    const totalBoughtQty = fam.tiers.reduce((s, t) => s + boughtByTier[t.id].qty, 0);
    const totalUsedCredits = fam.tiers.reduce((s, t) => s + usedByTier[t.id].credits, 0);
    const totalUsedQty = fam.tiers.reduce((s, t) => s + usedByTier[t.id].qty, 0);

    // ¿Hay actividad en esta familia? (compra o uso)
    const hasActivity = totalBoughtCredits > 0 || totalUsedCredits > 0;
    if (!hasActivity) return;

    // ¿Hay salto de tier? (uso en tier más alto del que se compró)
    let highestBoughtIdx = -1;
    let highestUsedIdx = -1;
    fam.tiers.forEach((t, idx) => {
      if (boughtByTier[t.id].qty > 0) highestBoughtIdx = Math.max(highestBoughtIdx, idx);
      if (usedByTier[t.id].qty > 0.5) highestUsedIdx = Math.max(highestUsedIdx, idx);
    });
    const hasTierEscalation = highestBoughtIdx >= 0 && highestUsedIdx > highestBoughtIdx;

    result.familyAnalysis.push({
      familyKey: famKey,
      familyName: fam.name,
      tiers: fam.tiers,
      boughtByTier,
      usedByTier,
      totalBoughtCredits,
      totalBoughtQty,
      totalUsedCredits,
      totalUsedQty,
      diffCredits: totalUsedCredits - totalBoughtCredits,
      hasTierEscalation,
      highestBoughtTier: highestBoughtIdx >= 0 ? fam.tiers[highestBoughtIdx] : null,
      highestUsedTier: highestUsedIdx >= 0 ? fam.tiers[highestUsedIdx] : null,
    });
  });

  // Mantener tierEscalations para compatibilidad
  result.tierEscalations = result.familyAnalysis
    .filter(fa => fa.hasTierEscalation)
    .map(fa => {
      const qtyImpacted = Math.round(fa.usedByTier[fa.highestUsedTier.id].qty);
      const extraPerUnit = fa.highestUsedTier.credits - fa.highestBoughtTier.credits;
      const extraAnnual = qtyImpacted * extraPerUnit;
      return {
        familyKey: fa.familyKey,
        familyName: fa.familyName,
        boughtTier: fa.highestBoughtTier,
        usedTier: fa.highestUsedTier,
        qtyImpacted,
        extraPerUnit,
        extraAnnual,
        totalAtBoughtTier: qtyImpacted * fa.highestBoughtTier.credits,
        totalAtUsedTier: qtyImpacted * fa.highestUsedTier.credits,
        multiplier: fa.highestBoughtTier.credits > 0 ? fa.highestUsedTier.credits / fa.highestBoughtTier.credits : 0,
      };
    });

  // ═══ Detección 2: Productos en consumo NO contemplados en propuesta ═══
  const proposalProdIds = new Set(proposalItems.map(it => it.prodId).filter(Boolean));
  const usageGrouped = {}; // prodId → total monthly
  usageItems.forEach(it => {
    if (it.prodId) {
      usageGrouped[it.prodId] = (usageGrouped[it.prodId] || 0) + (Number(it.monthly) || 0);
    }
  });

  Object.entries(usageGrouped).forEach(([prodId, monthly]) => {
    if (monthly <= 0) return;
    if (proposalProdIds.has(prodId)) return; // ya está contemplado

    // No contemplado: ver si es del mismo "family" que algo comprado (en cuyo caso es escalamiento, ya cubierto arriba)
    const fam = findFamily(prodId);
    if (fam) {
      const familyIds = fam.family.tiers.map(t => t.id);
      const familyInProposal = proposalItems.some(it => familyIds.includes(it.prodId));
      if (familyInProposal) return; // es escalamiento, ya está en tierEscalations
    }

    const prod = (typeof CATALOG !== "undefined" ? CATALOG : []).find(c => c.id === prodId);
    if (prod) {
      result.unplannedProducts.push({
        prodId,
        prod,
        monthlyUsage: monthly,
        annualUsage: monthly * 12,
      });
    }
  });

  // ═══ Detección 3: Productos comprados pero NO usados ═══
  const usageProdIds = new Set(Object.keys(usageGrouped));
  const proposalGrouped = {}; // prodId → total qty
  proposalItems.forEach(it => {
    if (it.prodId) {
      proposalGrouped[it.prodId] = (proposalGrouped[it.prodId] || 0) + (Number(it.qty) || 0);
    }
  });

  Object.entries(proposalGrouped).forEach(([prodId, qty]) => {
    if (qty <= 0) return;
    if (usageProdIds.has(prodId)) return; // sí se está usando

    // Verificar si la familia se está usando (en otro tier por escalamiento) — si sí, no marcar como "no usado"
    const fam = findFamily(prodId);
    if (fam) {
      const familyIds = fam.family.tiers.map(t => t.id);
      const familyInUsage = familyIds.some(id => (usageGrouped[id] || 0) > 0);
      if (familyInUsage) return; // se usa la familia, solo cambió de tier
    }

    const prod = (typeof CATALOG !== "undefined" ? CATALOG : []).find(c => c.id === prodId);
    if (prod) {
      result.unusedProducts.push({
        prodId,
        prod,
        qtyBought: qty,
      });
    }
  });

  result.hasFindings =
    result.familyAnalysis.length > 0 ||
    result.tierEscalations.length > 0 ||
    result.unplannedProducts.length > 0 ||
    result.unusedProducts.length > 0 ||
    result.totalUnallocated > 0 ||
    result.totalDeficit > 0;

  return result;
}

const C = {
  bg:"#FAFAF9", surface:"#FFFFFF", panel:"#F5F5F4", border:"#E7E5E4", borderHover:"#D6D3D1",
  text:"#0C0A09", text2:"#57534E", text3:"#A8A29E", text4:"#D6D3D1",
  accent:"#D71921",
  blue:"#1E40AF", blueDark:"#1E3A8A", blueBg:"#EFF6FF",
  green:"#047857", greenBg:"#ECFDF5",
  red:"#DC2626",
  amber:"#B45309", amberBg:"#FFFBEB",
};

// Iconos provenientes de lucide-react (importados arriba). Lineales, profesionales,
// con stroke-width controlable. Uso: <Plus size={14} strokeWidth={2} />


// ════════════════════════════════════════════════════════════════════════
// ADVISOR — Asistente de IA Vision One by Nextcom
// Botón flotante + panel chat. Modo cliente vs interno según prop.
// Recibe contexto de la sesión (productos, consumo, propuesta) para dar
// respuestas específicas en lugar de genéricas.
// ════════════════════════════════════════════════════════════════════════

const ADVISOR_QUICK_PROMPTS_CLIENT = [
  "¿Qué es Trend Vision One?",
  "¿Qué son los créditos / TrendAI Flex?",
  "¿Qué es CREM?",
  "Explícame mi cotización",
  "¿Cómo empiezo?",
];

const ADVISOR_QUICK_PROMPTS_INTERNAL = [
  "Defender una subida de tier",
  "Cómo responder: es muy caro",
  "Upsell típicos en banca",
  "Health check checklist",
  "Partner-led vs marketplace",
];

function Advisor({ mode = "client", getContext, isMobile }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const scrollRef = useRef(null);
  const inputRef = useRef(null);
  const isInternal = mode === "internal";

  // Auto-scroll al fondo cuando llegan mensajes
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  // Focus el input cuando se abre
  useEffect(() => {
    if (open && inputRef.current && !isMobile) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open, isMobile]);

  const sendMessage = async (text) => {
    const userText = (text || input).trim();
    if (!userText || loading) return;

    setInput("");
    setError("");

    const newUserMsg = { role: "user", content: userText, ts: Date.now() };
    const nextMessages = [...messages, newUserMsg];
    setMessages(nextMessages);
    setLoading(true);

    try {
      const context = typeof getContext === "function" ? getContext() : {};
      const resp = await fetch("/api/advisor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: nextMessages.map(m => ({ role: m.role, content: m.content })),
          mode,
          context,
        }),
      });

      if (!resp.ok) {
        const errData = await resp.json().catch(() => ({}));
        throw new Error(errData.detail || errData.error || `HTTP ${resp.status}`);
      }

      const data = await resp.json();
      const reply = data.reply || "No pude generar una respuesta. Intenta reformular tu pregunta.";
      setMessages(prev => [...prev, { role: "assistant", content: reply, ts: Date.now() }]);
    } catch (e) {
      console.error("[Advisor] error:", e);
      setError(e.message || "Error al consultar el asistente. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    sendMessage();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const clearChat = () => {
    if (messages.length === 0) return;
    if (confirm("¿Borrar la conversación?")) {
      setMessages([]);
      setError("");
    }
  };

  const quickPrompts = isInternal ? ADVISOR_QUICK_PROMPTS_INTERNAL : ADVISOR_QUICK_PROMPTS_CLIENT;
  const widgetContext = (() => {
    try {
      return typeof getContext === "function" ? getContext() : {};
    } catch (e) {
      return {};
    }
  })();
  const widgetProducts = Array.isArray(widgetContext.products) ? widgetContext.products : [];
  const widgetCommercials = widgetContext.commercials || {};
  const widgetMargin = Number(widgetCommercials.totalMargin);
  const widgetSalePrice = Number(widgetCommercials.salePrice);
  const widgetCostPrice = Number(widgetCommercials.costPrice);
  const widgetHasZeroPrices = isInternal && (
    !Number.isFinite(widgetSalePrice) ||
    !Number.isFinite(widgetCostPrice) ||
    widgetSalePrice <= 0 ||
    widgetCostPrice <= 0
  );

  // ─── Estilo del panel Advisor según modo ─────────
  const accentColor = isInternal ? "#0F4C81" : "#002F45";
  const accentBg = isInternal ? "#F1F7FB" : "#F5F7FA";
  const modeLabel = isInternal ? "Modo Nextcom · IA experta" : "Modo cliente · IA experta";
  const introText = isInternal
    ? "Puedo ayudarte a preparar reuniones, defender renovaciones, identificar oportunidades de upsell y responder objeciones comerciales."
    : "Puedo ayudarte a entender créditos, revisar módulos, explicar resultados y preparar una conversación con Nextcom.";

  return (
    <>
      <style>{`
        @keyframes advisor-fade-in { from { opacity: 0; transform: translateY(12px) scale(.985); } to { opacity: 1; transform: translateY(0) scale(1); } }
        @keyframes advisor-dot { 0%,80%,100% { transform: scale(0.6); opacity: 0.4; } 40% { transform: scale(1); opacity: 1; } }
        .advisor-panel {
          --advisor-accent: ${accentColor};
          --advisor-accent-bg: ${accentBg};
          color: #0f172a;
        }
        .advisor-header-button,
        .advisor-suggestion-row,
        .advisor-send-button {
          font: inherit;
        }
        .advisor-header-button {
          border: 1px solid transparent;
          background: transparent;
          color: #64748b;
          cursor: pointer;
          transition: background .16s ease, border-color .16s ease, color .16s ease;
        }
        .advisor-header-button:hover {
          background: #f8fafc;
          border-color: #e2e8f0;
          color: #0f172a;
        }
        .advisor-close-button {
          width: 34px;
          height: 34px;
          border-radius: 999px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0;
        }
        .advisor-clear-button {
          min-height: 32px;
          border-radius: 999px;
          padding: 0 10px;
          font-size: 12px;
          font-weight: 600;
        }
        .advisor-suggestion-row {
          width: 100%;
          border: 1px solid #e2e8f0;
          background: #ffffff;
          color: #334155;
          cursor: pointer;
          border-radius: 14px;
          padding: 10px 12px;
          display: grid;
          grid-template-columns: 30px 1fr 18px;
          align-items: center;
          gap: 10px;
          text-align: left;
          transition: border-color .16s ease, background .16s ease, box-shadow .16s ease, transform .16s ease;
        }
        .advisor-suggestion-row:hover {
          border-color: #bfdbfe;
          background: #f8fbff;
          box-shadow: 0 10px 22px rgba(15, 23, 42, .06);
          transform: translateY(-1px);
        }
        .advisor-suggestion-icon {
          width: 30px;
          height: 30px;
          border-radius: 10px;
          background: var(--advisor-accent-bg);
          color: var(--advisor-accent);
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        .advisor-message-row {
          display: flex;
          gap: 9px;
          margin-bottom: 14px;
        }
        .advisor-message-row--user {
          justify-content: flex-end;
        }
        .advisor-message-row--assistant {
          justify-content: flex-start;
        }
        .advisor-message-bubble {
          max-width: min(82%, 430px);
          border-radius: 18px;
          padding: 11px 13px;
          font-size: 13px;
          line-height: 1.55;
          white-space: pre-wrap;
          word-wrap: break-word;
        }
        .advisor-message-bubble--assistant {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          color: #0f172a;
          box-shadow: 0 10px 24px rgba(15, 23, 42, .045);
        }
        .advisor-message-bubble--user {
          background: var(--advisor-accent);
          color: #ffffff;
          box-shadow: 0 12px 22px rgba(15, 76, 129, .18);
        }
        .advisor-input {
          transition: border-color .16s ease, box-shadow .16s ease, background .16s ease;
        }
        .advisor-input:focus {
          border-color: #93c5fd;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, .12);
        }
        .advisor-send-button {
          width: 44px;
          height: 44px;
          border: none;
          border-radius: 14px;
          background: var(--advisor-accent);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: transform .16s ease, background .16s ease, opacity .16s ease;
        }
        .advisor-send-button:hover:not(:disabled) {
          transform: translateY(-1px);
          background: #0b3f6d;
        }
        .advisor-send-button:disabled {
          background: #e2e8f0;
          cursor: not-allowed;
          transform: none;
        }
        .advisor-md p { margin: 0 0 8px 0; }
        .advisor-md p:last-child { margin-bottom: 0; }
        .advisor-md strong { font-weight: 650; color: #0f172a; }
        .advisor-md ul, .advisor-md ol { margin: 6px 0 8px 0; padding-left: 18px; }
        .advisor-md li { margin: 2px 0; }
        .advisor-md code { background: #f1f5f9; padding: 1px 5px; border-radius: 5px; font-family: 'SF Mono', monospace; font-size: 92%; }
        @media (max-width: 640px) {
          .advisor-panel {
            border-radius: 0 !important;
          }
          .advisor-suggestion-row {
            grid-template-columns: 28px 1fr 16px;
            padding: 9px 10px;
          }
          .advisor-message-bubble {
            max-width: 84%;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .advisor-panel,
          .advisor-suggestion-row,
          .advisor-send-button {
            animation: none !important;
            transition: none !important;
          }
          .advisor-suggestion-row:hover,
          .advisor-send-button:hover:not(:disabled) {
            transform: none !important;
          }
        }
      `}</style>

      {/* Entry point flotante del asistente */}
      {!open && (
        <AssistantWidget
          mode={mode}
          isMobile={isMobile}
          hasProducts={widgetProducts.length > 0}
          hasZeroPrices={widgetHasZeroPrices}
          margin={Number.isFinite(widgetMargin) ? widgetMargin : null}
          onOpen={() => setOpen(true)}
        />
      )}

      {/* Panel del chat */}
      {open && (
        <div className="advisor-panel" style={{
          position: "fixed",
          bottom: isMobile ? 0 : 24,
          right: isMobile ? 0 : 24,
          left: isMobile ? 0 : "auto",
          top: isMobile ? 0 : "auto",
          width: isMobile ? "100%" : "min(620px, calc(100vw - 48px))",
          height: isMobile ? "100%" : "min(720px, calc(100vh - 48px))",
          background: "#FFFFFF",
          borderRadius: isMobile ? 0 : 24,
          border: "1px solid rgba(226, 232, 240, .95)",
          boxShadow: "0 28px 70px rgba(15, 23, 42, .22), 0 10px 28px rgba(15, 23, 42, .12)",
          zIndex: 100,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          animation: "advisor-fade-in .2s ease",
        }}>
          {/* Header */}
          <div style={{
            padding: isMobile ? "16px 18px" : "18px 20px",
            borderBottom: "1px solid #e2e8f0",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            background: "#fff",
            flexShrink: 0,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, minWidth: 0 }}>
              <AssistantAvatar state={loading ? "thinking" : "idle"} size={46} mode={mode} isActive />
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 16, fontWeight: 700, color: "#0f172a", lineHeight: 1.2 }}>
                  Vision One Advisor
                </div>
                <div style={{ fontSize: 12, color: "#64748b", lineHeight: 1.35, marginTop: 3, fontWeight: 500 }}>
                  {modeLabel}
                </div>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              {messages.length > 0 && (
                <button
                  className="advisor-header-button advisor-clear-button"
                  onClick={clearChat}
                  title="Borrar conversación"
                  type="button">
                  Limpiar
                </button>
              )}
              <button
                className="advisor-header-button advisor-close-button"
                onClick={() => setOpen(false)}
                title="Cerrar"
                type="button">
                <X size={17} strokeWidth={2} />
              </button>
            </div>
          </div>

          {/* Body — mensajes */}
          <div
            ref={scrollRef}
            style={{
              flex: 1,
              overflowY: "auto",
              padding: isMobile ? "16px" : "18px 20px",
              background: "#f8fafc",
            }}>
            {messages.length === 0 ? (
              <>
                <div style={{
                  background: accentBg,
                  border: "1px solid #dbeafe",
                  borderRadius: 18,
                  padding: isMobile ? "14px" : "16px",
                  color: "#0f172a",
                  lineHeight: 1.55,
                  marginBottom: 16,
                  display: "flex",
                  gap: 12,
                  alignItems: "flex-start",
                }}>
                  <div style={{
                    width: 34,
                    height: 34,
                    borderRadius: 12,
                    background: "#ffffff",
                    border: "1px solid #dbeafe",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: accentColor,
                    flexShrink: 0,
                  }}>
                    <Sparkles size={16} strokeWidth={2.2} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, marginBottom: 4, fontSize: 14 }}>
                      Hola, soy tu asesor Vision One.
                    </div>
                    <div style={{ color: "#475569", fontSize: 13 }}>
                      {introText}
                    </div>
                  </div>
                </div>

                <div className="advisor-message-row advisor-message-row--assistant" style={{ marginBottom: 16 }}>
                  <div style={{ flexShrink: 0, marginTop: 2 }}>
                    <AssistantAvatar state="idle" size={30} mode={mode} />
                  </div>
                  <div className="advisor-message-bubble advisor-message-bubble--assistant">
                    ¿Sobre qué tema te gustaría trabajar hoy?
                  </div>
                </div>

                <div style={{ fontSize: 11, color: "#64748b", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 10 }}>
                  Sugerencias para empezar
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {quickPrompts.map((q, i) => (
                    <button key={i} className="advisor-suggestion-row" onClick={() => sendMessage(q)} type="button">
                      <span className="advisor-suggestion-icon">
                        <MessageSquare size={14} strokeWidth={2.1} />
                      </span>
                      <span style={{ fontSize: 13, fontWeight: 600, color: "#1e293b" }}>{q}</span>
                      <ChevronRight size={16} color="#94a3b8" strokeWidth={2} />
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <>
                {messages.map((msg, i) => (
                  <div key={i} className={`advisor-message-row advisor-message-row--${msg.role}`}>
                    {msg.role === "assistant" && (
                      <div style={{ flexShrink: 0, marginTop: 2 }}>
                        <AssistantAvatar state="idle" size={30} mode={mode} />
                      </div>
                    )}
                    <div className={`advisor-message-bubble advisor-message-bubble--${msg.role}`}>
                      {msg.role === "assistant" ? (
                        <div className="advisor-md" dangerouslySetInnerHTML={{ __html: renderSimpleMarkdown(msg.content) }} />
                      ) : (
                        msg.content
                      )}
                    </div>
                  </div>
                ))}

                {/* Loading indicator */}
                {loading && (
                  <div className="advisor-message-row advisor-message-row--assistant">
                    <div style={{ flexShrink: 0, marginTop: 2 }}>
                      <AssistantAvatar state="thinking" size={30} mode={mode} isActive />
                    </div>
                    <div className="advisor-message-bubble advisor-message-bubble--assistant" style={{ display: "flex", alignItems: "center", gap: 5, width: 58 }}>
                      <span style={{ width: 6, height: 6, background: "#94a3b8", borderRadius: "50%", animation: "advisor-dot 1.4s infinite ease-in-out", animationDelay: "0s" }}></span>
                      <span style={{ width: 6, height: 6, background: "#94a3b8", borderRadius: "50%", animation: "advisor-dot 1.4s infinite ease-in-out", animationDelay: "0.16s" }}></span>
                      <span style={{ width: 6, height: 6, background: "#94a3b8", borderRadius: "50%", animation: "advisor-dot 1.4s infinite ease-in-out", animationDelay: "0.32s" }}></span>
                    </div>
                  </div>
                )}

                {/* Error */}
                {error && (
                  <div style={{
                    background: "#FEF2F2",
                    border: "1px solid #fecaca",
                    borderRadius: 14,
                    padding: "10px 12px",
                    fontSize: 12,
                    color: "#991B1B",
                    marginBottom: 12,
                    display: "flex", gap: 6, alignItems: "flex-start"
                  }}>
                    <AlertTriangle size={12} color="#991B1B" strokeWidth={2} style={{ marginTop: 2, flexShrink: 0 }} />
                    <span>{error}</span>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Input area */}
          <form onSubmit={handleSubmit} style={{
            padding: isMobile ? "12px 14px 10px" : "14px 16px 10px",
            borderTop: "1px solid #e2e8f0",
            background: "#fff",
            flexShrink: 0,
          }}>
            <div style={{ display: "flex", gap: 10, alignItems: "flex-end" }}>
              <textarea
                ref={inputRef}
                className="advisor-input"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={loading ? "Esperando respuesta..." : "Pregunta lo que quieras..."}
                disabled={loading}
                rows={1}
                style={{
                  flex: 1,
                  resize: "none",
                  border: "1px solid #cbd5e1",
                  borderRadius: 14,
                  padding: "12px 14px",
                  fontSize: 13,
                  fontFamily: "inherit",
                  color: "#0f172a",
                  outline: "none",
                  lineHeight: 1.4,
                  minHeight: 44,
                  maxHeight: 112,
                  background: loading ? "#f8fafc" : "#fff",
                }}
              />
              <button
                className="advisor-send-button"
                type="submit"
                disabled={loading || !input.trim()}
                aria-label="Enviar">
                <Send size={16} color={input.trim() && !loading ? "#fff" : "#94a3b8"} strokeWidth={2.3} />
              </button>
            </div>
            <div style={{
              marginTop: 9,
              color: "#94a3b8",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
              fontSize: 10.5,
              lineHeight: 1.35,
              textAlign: "center",
            }}>
              <Info size={12} strokeWidth={2} />
              <span>La IA puede cometer errores. Verifica información crítica con Nextcom.</span>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

// Render simple markdown a HTML (negritas, listas, párrafos)
function renderSimpleMarkdown(text) {
  if (!text) return "";
  // Escape HTML
  let html = String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  // Bold **text**
  html = html.replace(/\*\*([^\*]+)\*\*/g, "<strong>$1</strong>");
  // Inline code `text`
  html = html.replace(/`([^`]+)`/g, "<code>$1</code>");
  // Lists (lines starting with - or *)
  const lines = html.split("\n");
  const out = [];
  let inList = false;
  for (const line of lines) {
    const listMatch = line.match(/^(\s*)[-\*]\s+(.+)$/);
    if (listMatch) {
      if (!inList) { out.push("<ul>"); inList = true; }
      out.push("<li>" + listMatch[2] + "</li>");
    } else {
      if (inList) { out.push("</ul>"); inList = false; }
      if (line.trim()) out.push("<p>" + line + "</p>");
    }
  }
  if (inList) out.push("</ul>");
  return out.join("");
}


function useIsMobile() {
  const [isMobile, setIsMobile] = useState(typeof window !== "undefined" ? window.innerWidth < 768 : false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", check);
    check();
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
}

function ProductPicker({ onPick, onClose, triggerRef, isMobile }) {
  const [q, setQ] = useState("");
  const [coords, setCoords] = useState(null);
  const inpRef = useRef(null);
  const popRef = useRef(null);

  useEffect(() => {
    if (isMobile) {
      // Full screen on mobile
      setCoords({ mobile: true });
    } else if (triggerRef?.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const needed = 360;
      const top = spaceBelow < needed && rect.top > needed
        ? rect.top - needed - 4
        : rect.bottom + 4;
      setCoords({ top, left: rect.left, width: rect.width });
    }
    setTimeout(() => inpRef.current?.focus(), 50);
  }, [triggerRef, isMobile]);

  useEffect(() => {
    if (isMobile) return; // no outside-click close on mobile (has X button)
    const h = e => {
      if (popRef.current && !popRef.current.contains(e.target) && !triggerRef?.current?.contains(e.target)) onClose();
    };
    // Reposition on scroll instead of closing — so you can scroll inside the dropdown
    const onScroll = (e) => {
      // If scroll happens INSIDE the dropdown, ignore (let it scroll normally)
      if (popRef.current && popRef.current.contains(e.target)) return;
      // Otherwise, reposition the dropdown to follow its trigger
      if (triggerRef?.current) {
        const rect = triggerRef.current.getBoundingClientRect();
        // If trigger is off-screen, close the picker
        if (rect.bottom < 0 || rect.top > window.innerHeight) {
          onClose();
          return;
        }
        const spaceBelow = window.innerHeight - rect.bottom;
        const needed = 360;
        const top = spaceBelow < needed && rect.top > needed
          ? rect.top - needed - 4
          : rect.bottom + 4;
        setCoords({ top, left: rect.left, width: rect.width });
      }
    };
    document.addEventListener("mousedown", h);
    window.addEventListener("scroll", onScroll, true);
    return () => {
      document.removeEventListener("mousedown", h);
      window.removeEventListener("scroll", onScroll, true);
    };
  }, [onClose, triggerRef, isMobile]);

  const filtered = CATALOG.filter(p => {
    const s = q.toLowerCase();
    return !s || p.name.toLowerCase().includes(s) || p.cat.toLowerCase().includes(s) || (p.sku||"").toLowerCase().includes(s);
  });
  const grouped = {};
  filtered.forEach(p => { if(!grouped[p.cat]) grouped[p.cat]=[]; grouped[p.cat].push(p); });

  if (!coords) return null;

  const wrapStyle = isMobile ? {
    position:"fixed", top:0, left:0, right:0, bottom:0, zIndex:9999,
    background:C.surface, display:"flex", flexDirection:"column"
  } : {
    position:"fixed", top:coords.top, left:coords.left, width:coords.width, zIndex:9999,
    background:C.surface, border:`1px solid ${C.border}`, borderRadius:8,
    boxShadow:"0 10px 40px rgba(0,0,0,0.12), 0 2px 6px rgba(0,0,0,0.06)",
    maxHeight:360, overflow:"hidden", display:"flex", flexDirection:"column"
  };

  return (
    <div ref={popRef} style={wrapStyle}>
      <div style={{ padding:isMobile?"14px 14px 10px":"8px 10px", borderBottom:`1px solid ${C.border}`, display:"flex", gap:8, alignItems:"center" }}>
        <input ref={inpRef} type="text" placeholder="Buscar producto, SKU o categoría..." value={q} onChange={e=>setQ(e.target.value)}
          style={{ flex:1, fontSize:isMobile?16:13, padding: isMobile?"11px 13px":"7px 10px", border:`1px solid ${C.border}`, borderRadius:7, outline:"none", background:C.bg }}
          onKeyDown={e => { if(e.key==="Escape") onClose(); if(e.key==="Enter" && filtered.length) { onPick(filtered[0]); onClose(); } }}
        />
        {isMobile && <button onClick={onClose} style={{ fontSize:14, padding:"10px 14px", background:C.panel, border:"none", borderRadius:7, color:C.text2, fontWeight:600 }}>Cancelar</button>}
      </div>
      <div style={{ overflowY:"auto", flex:1, WebkitOverflowScrolling:"touch" }}>
        {Object.entries(grouped).length === 0 ? (
          <div style={{ padding:"20px 14px", textAlign:"center", fontSize:12, color:C.text3 }}>Sin resultados</div>
        ) : Object.entries(grouped).map(([cat, items]) => (
          <div key={cat}>
            <div style={{ padding:"8px 14px 4px", fontSize:10, fontWeight:700, color:C.text3, textTransform:"uppercase", letterSpacing:".06em", background:C.panel, position:"sticky", top:0 }}>{cat}</div>
            {items.map(p => (
              <button key={p.id} onClick={() => { onPick(p); onClose(); }}
                style={{ width:"100%", display:"flex", alignItems:"center", justifyContent:"space-between", gap:10, padding: isMobile?"14px 14px":"8px 12px", background:"none", border:"none", borderBottom:`1px solid ${C.border}`, cursor:"pointer", textAlign:"left", minHeight:isMobile?54:"auto" }}>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontSize:isMobile?14:12, fontWeight:500, color:C.text, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{p.name}</div>
                  <div style={{ fontSize:isMobile?11:10, color:C.text3, marginTop:2, display:"flex", gap:6 }}>
                    <span>por {p.unit}</span>
                    {p.sku && <span style={{ ...mono }}>· {p.sku}</span>}
                  </div>
                </div>
                <span style={{ ...mono, fontSize:isMobile?12:11, fontWeight:600, color:C.blue, background:C.blueBg, padding:"3px 8px", borderRadius:5, whiteSpace:"nowrap" }}>{fmt(p.credits)} cr</span>
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function LineRow({ line, onUpdate, onDelete, onDuplicate, idx, isMobile }) {
  const [picking, setPicking] = useState(false);
  const triggerRef = useRef(null);
  const prod = line.prodId ? CATALOG.find(p => p.id === line.prodId) : null;
  const total = prod ? line.qty * prod.credits : 0;
  const active = line.qty > 0 && prod;

  // Compute proration
  const months = monthsBetween(line.startDate, line.date);
  const proratedTotal = prod ? Math.round(line.qty * prod.credits * (months / 12)) : 0;
  const isProrated = prod && line.qty > 0 && Math.abs(months - 12) > 0.1;

  // Mobile card layout
  if (isMobile) {
    return (
      <div style={{
        background: active ? "#FAFCFF" : C.surface,
        border: `1px solid ${active ? "#C7D9EF" : C.border}`,
        borderRadius: 10,
        padding: 12,
        marginBottom: 8,
        position: "relative"
      }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:8 }}>
          <span style={{ ...mono, fontSize:11, color:C.text3, fontWeight:600 }}>#{String(idx+1).padStart(2,"0")}</span>
          <div style={{ display:"flex", gap:4 }}>
            <button onClick={() => onDuplicate(line.rowId)} disabled={!prod} title="Duplicar"
              style={{ width:32,height:32,borderRadius:6,border:`1px solid ${C.border}`,background:C.surface,cursor:prod?"pointer":"not-allowed",fontSize:14,color:C.text2,opacity:prod?1:0.4 }}>⊕</button>
            <button onClick={() => onDelete(line.rowId)} title="Eliminar"
              style={{ width:32,height:32,borderRadius:6,border:`1px solid ${C.border}`,background:C.surface,cursor:"pointer",fontSize:13,color:C.red }}>✕</button>
          </div>
        </div>

        <div ref={triggerRef} style={{ position:"relative", marginBottom:10 }}>
          <button onClick={() => setPicking(!picking)}
            style={{ width:"100%", textAlign:"left", background:C.surface, border:`1px solid ${C.border}`, borderRadius:7, padding:"10px 12px", cursor:"pointer", minHeight:54 }}>
            {prod ? (
              <div>
                <div style={{ fontSize:14, fontWeight:600, color:C.text }}>{prod.name}</div>
                <div style={{ fontSize:11, color:C.text3, marginTop:2, display:"flex", gap:6, flexWrap:"wrap" }}>
                  <span>{prod.cat}</span>
                  <span>· {fmt(prod.credits)} cr/año/{prod.unit}</span>
                  {prod.sku && <span style={{ ...mono }}>· {prod.sku}</span>}
                </div>
              </div>
            ) : (
              <div style={{ color:C.text3, fontSize:14, display:"flex", alignItems:"center", gap:6 }}>
                <span style={{ fontSize:16 }}>⊕</span> Buscar producto...
              </div>
            )}
          </button>
          {picking && <ProductPicker triggerRef={triggerRef} isMobile={true} onPick={p => onUpdate({ ...line, prodId:p.id })} onClose={() => setPicking(false)} />}
        </div>

        {/* Dates: start + end */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginBottom:8 }}>
          <div>
            <div style={{ fontSize:10, fontWeight:600, color:C.text3, marginBottom:3, textTransform:"uppercase", letterSpacing:".05em" }}>Inicio</div>
            <input type="date" value={line.startDate || ""} onChange={e=>onUpdate({...line, startDate:e.target.value})}
              style={{ ...mono, fontSize:13, color:C.text2, border:`1px solid ${C.border}`, borderRadius:7, padding:"10px 10px", background:C.surface, width:"100%", boxSizing:"border-box" }} />
          </div>
          <div>
            <div style={{ fontSize:10, fontWeight:600, color:C.text3, marginBottom:3, textTransform:"uppercase", letterSpacing:".05em" }}>Vencimiento</div>
            <input type="date" value={line.date} onChange={e=>onUpdate({...line, date:e.target.value})}
              style={{ ...mono, fontSize:13, color:C.text2, border:`1px solid ${isProrated?C.amber:C.border}`, borderRadius:7, padding:"10px 10px", background:C.surface, width:"100%", boxSizing:"border-box" }} />
          </div>
        </div>

        {/* Quantity */}
        <div>
          <div style={{ fontSize:10, fontWeight:600, color:C.text3, marginBottom:3, textTransform:"uppercase", letterSpacing:".05em" }}>Cantidad</div>
          <input type="number" inputMode="numeric" min={0} step={1} value={line.qty||""} placeholder="0" disabled={!prod}
            onChange={e => onUpdate({...line, qty:parseInt(e.target.value)||0})}
            style={{ ...mono, fontSize:16, fontWeight:600, textAlign:"right", padding:"10px 12px", border:`1px solid ${active?C.blue:C.border}`, borderRadius:7, background:active?"#fff":prod?C.surface:C.panel, color:C.text, outline:"none", width:"100%", boxSizing:"border-box" }} />
        </div>

        {/* Proration indicator */}
        {isProrated && (
          <div style={{ marginTop:10, padding:"8px 12px", background:C.amberBg, border:`1px solid #FDE68A`, borderRadius:7, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <span style={{ fontSize:11, color:C.amber, fontWeight:600 }}>⚠ Vigencia prorrateada</span>
            <span style={{ ...mono, fontSize:12, fontWeight:700, color:C.amber }}>{months} meses</span>
          </div>
        )}

        {/* Total */}
        {active && (
          <div style={{ marginTop:10, padding:"8px 12px", background:C.blueBg, borderRadius:7, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <span style={{ fontSize:11, color:C.text2, fontWeight:500 }}>Total de esta línea</span>
            <div style={{ textAlign:"right" }}>
              <div style={{ ...mono, fontSize:15, fontWeight:700, color:C.blue }}>{fmt(proratedTotal)} créditos</div>
              {isProrated && <div style={{ fontSize:10, color:C.text3, ...mono }}>base anual: {fmt(line.qty * prod.credits)}</div>}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Desktop table-row layout
  return (
    <div style={{
      display:"grid", gridTemplateColumns:"36px minmax(300px,1fr) 132px 132px 88px 96px 60px",
      alignItems:"center", gap:12, padding:"12px 20px",
      background: active ? "#F8FBFF" : "#fff",
      borderBottom:"1px solid #E2E8F0", position:"relative"
    }}>
      <div style={{ ...mono, fontSize:12, color:"#64748B", textAlign:"center" }}>{String(idx+1).padStart(2,"0")}</div>

      <div style={{ position:"relative" }} ref={triggerRef}>
        <button onClick={() => setPicking(!picking)}
          style={{ width:"100%", textAlign:"left", background:"#fff", border:`1px solid ${prod ? "#E2E8F0" : "#CBD5E1"}`, borderRadius:7, padding:"8px 11px", cursor:"pointer", display:"flex", alignItems:"center", gap:8, minHeight:40, boxShadow:"0 1px 2px rgba(15,23,42,.03)" }}>
          {prod ? (
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ fontSize:13, fontWeight:600, color:"#0F172A", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{prod.name}</div>
              <div style={{ fontSize:10, color:"#64748B", marginTop:2, display:"flex", gap:8, alignItems:"center" }}>
                <span>{prod.cat}</span>
                <span>· {fmt(prod.credits)} cr/año/{prod.unit}</span>
                {prod.sku && <span style={{ ...mono }}>· {prod.sku}</span>}
                {isProrated && (
                  <span style={{ background:C.amberBg, color:C.amber, padding:"1px 6px", borderRadius:3, fontWeight:700, ...mono }}>
                    {months}m · prorrateado
                  </span>
                )}
              </div>
            </div>
          ) : (
            <div style={{ color:"#94A3B8", fontSize:13, display:"flex", alignItems:"center", gap:8 }}>
              <Search size={14} /> Buscar producto del catálogo...
            </div>
          )}
        </button>
        {picking && <ProductPicker triggerRef={triggerRef} isMobile={false} onPick={p => onUpdate({ ...line, prodId:p.id })} onClose={() => setPicking(false)} />}
      </div>

      <input type="date" value={line.startDate || ""} onChange={e=>onUpdate({...line, startDate:e.target.value})}
        title="Fecha de inicio"
        style={{ ...mono, fontSize:12, color:"#0F172A", border:"1px solid #E2E8F0", borderRadius:7, padding:"8px 10px", background:"#fff", width:"100%", boxSizing:"border-box", boxShadow:"0 1px 2px rgba(15,23,42,.03)" }} />

      <input type="date" value={line.date} onChange={e=>onUpdate({...line, date:e.target.value})}
        title="Fecha de vencimiento"
        style={{ ...mono, fontSize:12, color:"#0F172A", border:`1px solid ${isProrated?C.amber:"#E2E8F0"}`, borderRadius:7, padding:"8px 10px", background:"#fff", width:"100%", boxSizing:"border-box", boxShadow:"0 1px 2px rgba(15,23,42,.03)" }} />

      <input type="number" min={0} step={1} value={line.qty||""} placeholder="0" disabled={!prod}
        onChange={e => onUpdate({...line, qty:parseInt(e.target.value)||0})}
        style={{ ...mono, fontSize:13, fontWeight:600, textAlign:"right", padding:"8px 10px", border:`1px solid ${active?C.blue:"#E2E8F0"}`, borderRadius:7, background:prod?"#fff":"#F1F5F9", color:"#0F172A", outline:"none", width:"100%", boxShadow:"0 1px 2px rgba(15,23,42,.03)" }} />

      <div style={{ ...mono, fontSize:13, fontWeight:700, textAlign:"right", color:active?C.blue:"#64748B" }}>
        {active ? (
          <div>
            <div>{fmt(proratedTotal)}</div>
            {isProrated && <div style={{ fontSize:9, color:C.text3, fontWeight:400 }}>base: {fmt(line.qty * prod.credits)}</div>}
          </div>
        ) : "—"}
      </div>

      <div style={{ display:"flex", gap:6, justifyContent:"flex-end" }}>
        <button onClick={() => onDuplicate(line.rowId)} disabled={!prod} title="Duplicar"
          style={{ width:32,height:32,borderRadius:7,border:"1px solid #E2E8F0",background:"#fff",cursor:prod?"pointer":"not-allowed",fontSize:13,color:prod?"#64748B":"#CBD5E1",display:"flex",alignItems:"center",justifyContent:"center",opacity:prod?1:0.5,boxShadow:"0 1px 2px rgba(15,23,42,.03)" }}><Plus size={14} /></button>
        <button onClick={() => onDelete(line.rowId)} title="Eliminar"
          style={{ width:32,height:32,borderRadius:7,border:"1px solid #E2E8F0",background:"#fff",cursor:"pointer",fontSize:12,color:C.red,display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 1px 2px rgba(15,23,42,.03)" }}><X size={14} /></button>
      </div>
    </div>
  );
}

function PrintView({ data }) {
  const { lines, totalCredits, totalRevenue, totalCost, totalMargin, marginPct, salePrice, costPrice, soporteSale, soporteCost, soporteDate, supportPolicy = "Platinum", clientName } = data;
  const selectedSupportPolicy = normalizeSupportPolicy(supportPolicy);
  const mColor = pct => pct >= 20 ? "#047857" : pct > 0 ? "#B45309" : "#DC2626";
  const today = new Date().toLocaleDateString("es-PA", { year:"numeric", month:"long", day:"numeric" });
  const activeRows = lines.filter(l => l.prodId && l.qty > 0).map(l => ({ ...l, prod:CATALOG.find(p => p.id===l.prodId), total:l.qty * (CATALOG.find(p => p.id===l.prodId)?.credits||0) }));

  const kpis = [
    { l:"Precio al cliente", v:fmtU(salePrice), c:"#1E40AF" },
    { l:"Costo proveedor",   v:fmtU(costPrice), c:"#0C0A09" },
    { l:"Margen / crédito",  v:`${fmtU(salePrice-costPrice)} · ${(salePrice>0?(salePrice-costPrice)/salePrice*100:0).toFixed(1)}%`, c:mColor(salePrice>0?(salePrice-costPrice)/salePrice*100:0) },
  ];
  const bigKpis = [
    { l:"Créditos",  v:fmt(totalCredits),           c:"#1E40AF" },
    { l:"Ingresos",  v:fmtU(totalRevenue),          c:"#0C0A09" },
    { l:"Costo",     v:fmtU(totalCost),             c:"#57534E" },
    { l:"Margen",    v:fmtU(totalMargin),           c:mColor(marginPct) },
    { l:"Rentab.",   v:`${marginPct.toFixed(1)}%`,  c:mColor(marginPct) },
  ];
  const pl = [
    { l:"Ingresos por créditos", v:fmtU(totalCredits*salePrice), c:"#0C0A09", bold:false, bg:"#fff" },
    { l:"Ingresos por soporte",  v:fmtU(soporteSale), c:"#0C0A09", bold:false, bg:"#fff" },
    { l:"Total ingresos",        v:fmtU(totalRevenue), c:"#0C0A09", bold:true, bg:"#FAFAF9" },
    { l:"Costo créditos",        v:`(${fmtU(totalCredits*costPrice)})`, c:"#DC2626", bold:false, bg:"#fff" },
    { l:"Costo soporte",         v:`(${fmtU(soporteCost)})`, c:"#DC2626", bold:false, bg:"#fff" },
    { l:"Total costos",          v:`(${fmtU(totalCost)})`, c:"#DC2626", bold:true, bg:"#FEF2F2" },
    { l:"MARGEN BRUTO",          v:fmtU(totalMargin), c:mColor(marginPct), bold:true, bg:marginPct>=20?"#ECFDF5":marginPct>0?"#FFFBEB":"#FEF2F2", big:true },
    { l:"Rentabilidad",          v:`${marginPct.toFixed(1)}%`, c:mColor(marginPct), bold:true, bg:"#fff" },
  ];

  return (
    <div className="print-only" style={{ padding:"24px 32px", maxWidth:780, margin:"0 auto", background:"#fff", color:"#0C0A09", fontFamily:"system-ui,sans-serif", fontSize:13 }}>
      {/* Header */}
      <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:20, paddingBottom:14, borderBottom:"2px solid #0C0A09" }}>
        <div style={{ display:"flex", alignItems:"center", gap:12 }}>
          <div style={{ width:40, height:40, background:"#D71921", borderRadius:9, display:"flex", alignItems:"center", justifyContent:"center" }}>
            <span style={{ color:"#fff", fontSize:23, fontWeight:900, letterSpacing:"-1px", lineHeight:1 }}>T</span>
          </div>
          <div>
            <div style={{ fontSize:17, fontWeight:700, letterSpacing:"-.01em" }}>Vision One Credits</div>
            <div style={{ fontSize:11, color:"#A8A29E" }}>{clientName ? `Cliente: ${clientName} · ` : ""}Análisis de Rentabilidad · Uso Interno</div>
          </div>
        </div>
        <div style={{ textAlign:"right" }}>
          <div style={{ fontSize:11, color:"#A8A29E" }}>Generado</div>
          <div style={{ fontSize:13, fontWeight:600 }}>{today}</div>
          <div style={{ display:"inline-block", marginTop:4, background:"#FEF3C7", color:"#B45309", fontSize:9, fontWeight:700, padding:"2px 8px", borderRadius:4, letterSpacing:".04em" }}>CONFIDENCIAL · USO INTERNO</div>
        </div>
      </div>

      {/* Pricing config */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:8, marginBottom:16 }}>
        {kpis.map(k => (
          <div key={k.l} style={{ background:"#FAFAF9", border:"1px solid #E7E5E4", borderRadius:6, padding:"10px 12px" }}>
            <div style={{ fontSize:10, color:"#A8A29E", marginBottom:3, textTransform:"uppercase", letterSpacing:".05em" }}>{k.l}</div>
            <div style={{ ...mono, fontSize:14, fontWeight:700, color:k.c }}>{k.v}</div>
          </div>
        ))}
      </div>

      {/* Big KPIs */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:6, marginBottom:20 }}>
        {bigKpis.map(k => (
          <div key={k.l} style={{ border:"1px solid #E7E5E4", borderRadius:6, padding:"9px 11px", background:"#fff" }}>
            <div style={{ fontSize:10, color:"#A8A29E", marginBottom:2 }}>{k.l}</div>
            <div style={{ ...mono, fontSize:13, fontWeight:700, color:k.c }}>{k.v}</div>
          </div>
        ))}
      </div>

      {/* Detail table */}
      <div style={{ fontSize:10, fontWeight:700, color:"#A8A29E", textTransform:"uppercase", letterSpacing:".08em", marginBottom:6 }}>Líneas del negocio</div>
      <table style={{ width:"100%", borderCollapse:"collapse", border:"1px solid #E7E5E4" }}>
        <thead>
          <tr style={{ background:"#F5F5F4" }}>
            {["#","Producto","Vencimiento","Cant.","Rate","Total cr / $"].map((h,i) => (
              <th key={i} style={{ padding:"8px 10px", textAlign:i>=3?"right":"left", fontSize:10, fontWeight:700, color:"#57534E", textTransform:"uppercase", letterSpacing:".05em" }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {activeRows.map((l, i) => (
            <tr key={i}>
              <td style={{ padding:"8px 10px", fontSize:11, color:"#A8A29E", ...mono, borderBottom:"1px solid #E7E5E4" }}>{String(i+1).padStart(2,"0")}</td>
              <td style={{ padding:"8px 10px", fontSize:12, borderBottom:"1px solid #E7E5E4" }}>
                {l.prod.name}
                <br/>
                <span style={{ fontSize:10, color:"#A8A29E", ...(l.prod.sku ? mono : {}) }}>{l.prod.sku ? `${l.prod.sku} · ${l.prod.cat}` : l.prod.cat}</span>
              </td>
              <td style={{ padding:"8px 10px", fontSize:11, color:"#57534E", borderBottom:"1px solid #E7E5E4", ...mono }}>{l.date || "—"}</td>
              <td style={{ padding:"8px 10px", ...mono, textAlign:"right", borderBottom:"1px solid #E7E5E4" }}>{l.qty.toLocaleString()}</td>
              <td style={{ padding:"8px 10px", fontSize:11, ...mono, textAlign:"right", color:"#A8A29E", borderBottom:"1px solid #E7E5E4" }}>{fmt(l.prod.credits)} cr/u</td>
              <td style={{ padding:"8px 10px", ...mono, fontWeight:700, textAlign:"right", color:"#1E40AF", borderBottom:"1px solid #E7E5E4" }}>{fmt(l.total)}</td>
            </tr>
          ))}
          {soporteSale > 0 && (
            <tr>
              <td style={{ padding:"8px 10px", fontSize:11, color:"#A8A29E", ...mono, borderBottom:"1px solid #E7E5E4" }}>{String(activeRows.length+1).padStart(2,"0")}</td>
              <td style={{ padding:"8px 10px", fontSize:12, borderBottom:"1px solid #E7E5E4" }}>
                Póliza {selectedSupportPolicy} Trend Micro<br/>
                <span style={{ fontSize:10, color:"#A8A29E" }}>Servicio profesional · Precio fijo</span>
              </td>
              <td style={{ padding:"8px 10px", fontSize:11, color:"#57534E", borderBottom:"1px solid #E7E5E4", ...mono }}>{soporteDate || "—"}</td>
              <td style={{ padding:"8px 10px", ...mono, textAlign:"right", borderBottom:"1px solid #E7E5E4" }}>1</td>
              <td style={{ padding:"8px 10px", fontSize:11, textAlign:"right", color:"#A8A29E", borderBottom:"1px solid #E7E5E4" }}>servicio</td>
              <td style={{ padding:"8px 10px", ...mono, fontWeight:700, textAlign:"right", color:"#1E40AF", borderBottom:"1px solid #E7E5E4" }}>{fmtU(soporteSale)}</td>
            </tr>
          )}
        </tbody>
        <tfoot>
          <tr style={{ background:"#EFF6FF", borderTop:"2px solid #1E40AF" }}>
            <td colSpan={5} style={{ padding:10, fontSize:12, fontWeight:700, color:"#1E40AF" }}>TOTAL CRÉDITOS VISION ONE</td>
            <td style={{ padding:10, fontSize:14, fontWeight:700, ...mono, textAlign:"right", color:"#1E40AF" }}>{fmt(totalCredits)}</td>
          </tr>
        </tfoot>
      </table>

      {/* P&L */}
      <div style={{ marginTop:14, border:"1px solid #E7E5E4", borderRadius:6, overflow:"hidden" }}>
        <div style={{ background:"#0C0A09", padding:"9px 14px" }}>
          <div style={{ fontSize:12, fontWeight:700, color:"#fff", letterSpacing:".01em" }}>Análisis de Rentabilidad (P&L)</div>
        </div>
        <table style={{ width:"100%", borderCollapse:"collapse" }}>
          <tbody>
            {pl.map(m => (
              <tr key={m.l} style={{ background:m.bg, borderTop:"1px solid #E7E5E4" }}>
                <td style={{ padding:"8px 14px", fontSize:m.big?13:12, fontWeight:m.bold?700:400 }}>{m.l}</td>
                <td style={{ padding:"8px 14px", fontSize:m.big?15:13, fontWeight:m.bold?700:400, ...mono, textAlign:"right", color:m.c }}>{m.v}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div style={{ marginTop:16, paddingTop:10, borderTop:"1px solid #E7E5E4", display:"flex", justifyContent:"space-between" }}>
        <div style={{ fontSize:10, color:"#A8A29E" }}>Nextcom Systems, Inc. · RUC 1253816-1-593861 DV 16 · +507 394-1405</div>
        <div style={{ fontSize:10, color:"#A8A29E" }}>Trend Micro Credit Calculator · Jan 2026</div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════
// Helper para generar PDF reales desde HTML (sin print del navegador)
//
// NOTA: NO usamos html2pdf.js porque tiene un bug crítico — clona el
// elemento target al main document para renderizarlo, pero NO copia los
// <style> siblings del <head>. El clone llega al main doc sin las reglas
// CSS que necesita y termina renderizando recortado y mal posicionado.
//
// En lugar de eso vamos directo a html2canvas + jsPDF:
//   1. Render el HTML en un iframe aislado (CSS no contamina la app)
//   2. html2canvas captura el elemento DENTRO del iframe (con su CSS)
//   3. jsPDF arma el PDF manualmente con el canvas resultante
// ════════════════════════════════════════════════════════════════════════
let _pdfDepsPromise = null;
function loadPdfDeps() {
  if (_pdfDepsPromise) return _pdfDepsPromise;
  _pdfDepsPromise = (async () => {
    if (typeof window === "undefined") throw new Error("PDF generation requires a browser");

    const loadScript = (src) => new Promise((resolve, reject) => {
      const s = document.createElement("script");
      s.src = src;
      s.onload = () => resolve();
      s.onerror = () => reject(new Error("No se pudo cargar " + src));
      document.head.appendChild(s);
    });

    if (!window.html2canvas) {
      await loadScript("https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js");
    }
    if (!window.jspdf) {
      await loadScript("https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js");
    }
    if (!window.html2canvas || !window.jspdf) {
      throw new Error("No se cargaron las librerías de PDF");
    }
    return { html2canvas: window.html2canvas, jsPDF: window.jspdf.jsPDF };
  })();
  return _pdfDepsPromise;
}

function resolvePdfAssetUrl(asset) {
  return typeof window !== "undefined" ? new URL(asset, window.location.href).href : asset;
}

async function pdfAssetToDataUrl(asset) {
  const url = resolvePdfAssetUrl(asset);
  if (typeof window === "undefined" || url.startsWith("data:")) return url;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`No se pudo cargar asset PDF: ${response.status}`);
    const blob = await response.blob();

    return await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.warn("No se pudo convertir asset PDF a data URL; usando URL directa.", error);
    return url;
  }
}

async function generatePdfFromHtml(htmlContent, filename) {
  const { html2canvas, jsPDF } = await loadPdfDeps();

  // Ancho fijo en px para el iframe — 800px deja margen cómodo para el
  // .container de 780px aún con padding de body (28px × 2 = 56px).
  const RENDER_WIDTH = 800;
  const SCALE = 2;

  // Iframe off-screen pero RENDERIZADO (left negativo, NO opacity:0 ni
  // visibility:hidden, que en algunos browsers paran el render del contenido).
  const iframe = document.createElement("iframe");
  iframe.setAttribute("aria-hidden", "true");
  iframe.style.cssText = [
    "position:fixed",
    "left:-10000px",
    "top:0",
    `width:${RENDER_WIDTH}px`,
    "height:1200px",
    "background:#ffffff",
    "border:0",
    "z-index:-1",
  ].join(";");
  document.body.appendChild(iframe);

  try {
    // Escribir el HTML completo en el iframe (CSS queda aislado)
    const doc = iframe.contentDocument || iframe.contentWindow.document;
    doc.open();
    doc.write(htmlContent);
    doc.close();
    doc.documentElement.style.backgroundColor = "#ffffff";
    if (doc.body) doc.body.style.backgroundColor = "#ffffff";

    // Esperar a que el iframe termine de parsear
    if (doc.readyState !== "complete") {
      await new Promise(resolve => {
        const tick = () => doc.readyState === "complete" ? resolve() : setTimeout(tick, 30);
        tick();
      });
    }

    // Esperar a que TODAS las imágenes terminen de decodificar.
    // Los logos van en base64 pero la decodificación no es instantánea.
    const images = Array.from(doc.images || []);
    if (images.length > 0) {
      await Promise.all(images.map(img => {
        if (img.complete && img.naturalHeight !== 0) return Promise.resolve();
        return new Promise(res => {
          let done = false;
          const finish = () => { if (!done) { done = true; res(); } };
          img.addEventListener("load", finish);
          img.addEventListener("error", finish);
          setTimeout(finish, 3000); // safety net
        });
      }));
    }

    // Dos frames para que el layout estabilice
    await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));

    // Encontrar el target
    const target = doc.querySelector(".pdf-content, .print-only")
      || (doc.body && doc.body.firstElementChild)
      || doc.body;

    if (!target) {
      throw new Error("No se encontró el contenido del PDF");
    }

    // Ajustar iframe al alto del contenido para que html2canvas mida bien
    const contentHeight = Math.max(
      target.scrollHeight,
      doc.body.scrollHeight,
      doc.documentElement.scrollHeight,
      target.offsetHeight
    );
    iframe.style.height = `${contentHeight + 80}px`;
    await new Promise(r => setTimeout(r, 80));

    // ════════════════════════════════════════════════════════════════════
    // CONSTRUCCIÓN DEL PDF: jsPDF directamente, paginando manualmente.
    // ════════════════════════════════════════════════════════════════════
    const pdf = new jsPDF({
      unit: "mm",
      format: "a4",
      orientation: "portrait",
      compress: true,
    });

    const pageWidthMm = pdf.internal.pageSize.getWidth();   // 210
    const pageHeightMm = pdf.internal.pageSize.getHeight(); // 297
    const marginMm = 10;
    const contentWidthMm = pageWidthMm - 2 * marginMm;      // 190
    const contentHeightMm = pageHeightMm - 2 * marginMm;    // 277

    const renderCanvas = (element) => html2canvas(element, {
      scale: SCALE,
      useCORS: true,
      allowTaint: true,
      logging: false,
      backgroundColor: "#ffffff",
    });

    // Canvas tiene dimensiones en píxeles físicos (ya con scale aplicado).
    // Para escalarlo a mm: dividir por SCALE para volver a CSS px, luego
    // convertir CSS px → mm a 96 DPI (25.4mm = 96px).
    const cssPxToMm = (px) => (px * 25.4) / 96;

    const composeCanvasOnWhite = (sourceCanvas) => {
      const opaqueCanvas = document.createElement("canvas");
      opaqueCanvas.width = sourceCanvas.width;
      opaqueCanvas.height = sourceCanvas.height;
      const ctx = opaqueCanvas.getContext("2d");
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, opaqueCanvas.width, opaqueCanvas.height);
      ctx.drawImage(sourceCanvas, 0, 0);
      return opaqueCanvas;
    };

    const addCanvasAsPage = (canvas, pageIdx) => {
      const opaqueCanvas = composeCanvasOnWhite(canvas);
      const canvasCssWidth = canvas.width / SCALE;
      const canvasCssHeight = canvas.height / SCALE;
      const naturalWidthMm = cssPxToMm(canvasCssWidth);
      const naturalHeightMm = cssPxToMm(canvasCssHeight);
      const widthFit = contentWidthMm / naturalWidthMm;
      const heightFit = contentHeightMm / naturalHeightMm;
      const fitFactor = Math.min(widthFit, heightFit);
      const renderedWidthMm = naturalWidthMm * fitFactor;
      const renderedHeightMm = naturalHeightMm * fitFactor;
      const xMm = marginMm + (contentWidthMm - renderedWidthMm) / 2;

      if (pageIdx > 0) pdf.addPage();
      pdf.setFillColor(255, 255, 255);
      pdf.rect(0, 0, pageWidthMm, pageHeightMm, "F");
      pdf.addImage(opaqueCanvas.toDataURL("image/jpeg", 0.95), "JPEG", xMm, marginMm, renderedWidthMm, renderedHeightMm);
    };

    const explicitPages = Array.from(target.children || []).filter(el => el.classList && el.classList.contains("pdf-page"));
    if (explicitPages.length > 0) {
      for (let i = 0; i < explicitPages.length; i++) {
        const pageCanvas = await renderCanvas(explicitPages[i]);
        addCanvasAsPage(pageCanvas, i);
      }
      pdf.save(filename);
      return;
    }

    // ════════════════════════════════════════════════════════════════════
    // CAPTURA: html2canvas directamente sobre el elemento del iframe.
    // Sin overrides de windowWidth/width/height — dejamos que html2canvas
    // use el contexto del iframe (target.ownerDocument.defaultView). Esto
    // evita el desfase que aparecía con html2pdf.js.
    // ════════════════════════════════════════════════════════════════════
    const canvas = await renderCanvas(target);

    const canvasCssWidth = canvas.width / SCALE;
    const canvasCssHeight = canvas.height / SCALE;
    const naturalWidthMm = cssPxToMm(canvasCssWidth);

    // Factor de escala para ajustar al ancho disponible de la página
    const fitFactor = contentWidthMm / naturalWidthMm;
    const totalRenderedHeightMm = cssPxToMm(canvasCssHeight) * fitFactor;

    if (totalRenderedHeightMm <= contentHeightMm + 0.5) {
      // Cabe en una sola página
      const imgData = composeCanvasOnWhite(canvas).toDataURL("image/jpeg", 0.95);
      pdf.addImage(imgData, "JPEG", marginMm, marginMm, contentWidthMm, totalRenderedHeightMm);
    } else {
      // Paginar: cortar el canvas en slices, cada uno con la altura de una página
      const pxPerMm = canvas.height / totalRenderedHeightMm;
      const pageSlicePx = Math.floor(contentHeightMm * pxPerMm);
      let yCanvas = 0;
      let pageIdx = 0;

      while (yCanvas < canvas.height) {
        const sliceHeightPx = Math.min(pageSlicePx, canvas.height - yCanvas);

        const sliceCanvas = document.createElement("canvas");
        sliceCanvas.width = canvas.width;
        sliceCanvas.height = sliceHeightPx;
        const sctx = sliceCanvas.getContext("2d");
        sctx.fillStyle = "#ffffff";
        sctx.fillRect(0, 0, sliceCanvas.width, sliceCanvas.height);
        sctx.drawImage(canvas, 0, -yCanvas);

        const sliceData = sliceCanvas.toDataURL("image/jpeg", 0.95);
        const sliceHeightMm = sliceHeightPx / pxPerMm;

        if (pageIdx > 0) pdf.addPage();
        pdf.addImage(sliceData, "JPEG", marginMm, marginMm, contentWidthMm, sliceHeightMm);

        yCanvas += sliceHeightPx;
        pageIdx++;
      }
    }

    pdf.save(filename);
  } catch (err) {
    console.error("[generatePdfFromHtml] error:", err);
    throw err;
  } finally {
    if (iframe.parentNode) {
      document.body.removeChild(iframe);
    }
  }
}

const PRINT_CSS = `
  @media screen {
    .print-only { display: none !important; }
  }
  @media print {
    @page { margin: 14mm 12mm; size: A4; }
    html, body { background: white !important; margin: 0 !important; padding: 0 !important; }
    body * { visibility: hidden !important; }
    .print-only, .print-only * { visibility: visible !important; }
    .print-only { position: absolute !important; left: 0 !important; top: 0 !important; width: 100% !important; display: block !important; }
    .no-print { display: none !important; }
    * { print-color-adjust: exact !important; -webkit-print-color-adjust: exact !important; }
  }
`;

function downloadReport(data) {
  const { lines, totalCredits, totalRevenue, totalCost, totalMargin, marginPct, salePrice, costPrice, soporteSale, soporteCost, soporteDate, clientName, supportPolicy = "Platinum", currency = "USD", rateSource = "bcv", activeRate = 0, vesRate = 1 } = data;
  const isVES = currency === "VES";
  const sym = isVES ? "Bs." : "$";
  const fmtView = usd => `${sym} ${(usd * (isVES ? vesRate : 1)).toLocaleString("en-US", { minimumFractionDigits:2, maximumFractionDigits:2 })}`;
  const fmtUSDsm = usd => `$${usd.toLocaleString("en-US", { minimumFractionDigits:2, maximumFractionDigits:2 })}`;
  const mC = pct => pct >= 20 ? "#047857" : pct > 0 ? "#B45309" : "#DC2626";
  const today = new Date().toLocaleDateString("es-PA", { year:"numeric", month:"long", day:"numeric" });
  const trendAiPdfLogo = typeof window !== "undefined" ? new URL(trendAiSidebarLogo, window.location.href).href : trendAiSidebarLogo;
  const active = lines.filter(l => l.prodId && l.qty > 0).map(l => {
    const p = CATALOG.find(c => c.id===l.prodId);
    const months = monthsBetween(l.startDate, l.date);
    const prorated = Math.round(l.qty * p.credits * (months / 12));
    return { ...l, prod:p, months, prorated, baseTotal: l.qty * p.credits, isProrated: Math.abs(months - 12) > 0.1 };
  });
  const perCrPct = salePrice > 0 ? (salePrice-costPrice)/salePrice*100 : 0;
  const selectedSupportPolicy = normalizeSupportPolicy(supportPolicy);
  const supportIncluded = soporteSale > 0 || soporteCost > 0;

  const rowsHTML = active.map((l, i) => `
    <tr style="background:${i % 2 === 0 ? "#FFFFFF" : "#F8FAFC"}">
      <td style="padding:8px 9px;border-bottom:1px solid #E2E8F0">
        <div style="font-size:10.5px;font-weight:700;color:#0F172A;line-height:1.3">${l.prod.name}</div>
        ${l.isProrated ? `<div style="display:inline-block;margin-top:5px;background:#FEF3C7;color:#92400E;border:1px solid #FDE68A;border-radius:999px;padding:2px 7px;font-size:9px;font-weight:700;letter-spacing:.02em">${l.months} meses prorrateado</div>` : ""}
      </td>
      <td style="padding:8px 7px;border-bottom:1px solid #E2E8F0">
        <div style="font-size:9px;color:#475569;line-height:1.3">${l.prod.cat}</div>
        <div style="font-size:9px;color:#64748B;font-family:'SF Mono',monospace;margin-top:2px">${l.prod.sku || "Sin SKU"}</div>
      </td>
      <td style="padding:8px 7px;border-bottom:1px solid #E2E8F0;font-size:9px;color:#475569;font-family:'SF Mono',monospace;line-height:1.35">
        ${l.startDate || "Sin inicio"}<br>
        <span style="color:#94A3B8">${l.date || "Sin fin"}</span>
      </td>
      <td style="padding:8px 6px;border-bottom:1px solid #E2E8F0;text-align:right;font-family:'SF Mono',monospace;font-size:9.5px;color:#0F172A">${l.qty.toLocaleString()}</td>
      <td style="padding:8px 6px;border-bottom:1px solid #E2E8F0;text-align:right;font-family:'SF Mono',monospace;font-size:9.5px;color:#0F172A">
        ${fmt(l.prorated)}
        ${l.isProrated ? `<br><span style="font-size:9px;color:#94A3B8">base ${fmt(l.baseTotal)}</span>` : ""}
      </td>
      <td style="padding:8px 6px;border-bottom:1px solid #E2E8F0;text-align:right;font-family:'SF Mono',monospace;font-size:9.5px;color:#1D4ED8">${fmtView(salePrice)}</td>
      <td style="padding:8px 6px;border-bottom:1px solid #E2E8F0;text-align:right;font-family:'SF Mono',monospace;font-size:9.5px;color:#475569">${fmtUSDsm(costPrice)}</td>
      <td style="padding:8px 6px;border-bottom:1px solid #E2E8F0;text-align:right;font-family:'SF Mono',monospace;font-size:9.5px;font-weight:700;color:${mC(perCrPct)}">${fmtUSDsm(l.prorated * (salePrice - costPrice))}</td>
      <td style="padding:8px 9px;border-bottom:1px solid #E2E8F0;text-align:right;font-family:'SF Mono',monospace;font-size:9.5px;font-weight:800;color:#0F172A">${fmtView(l.prorated * salePrice)}</td>
    </tr>`).join("");

  const supportSummaryHTML = supportIncluded
    ? `<strong>Soporte:</strong> Póliza ${selectedSupportPolicy} · Venta soporte: ${fmtView(soporteSale)} · Costo soporte: ${fmtUSDsm(soporteCost)} · Vencimiento: ${soporteDate || "Sin fecha"}`
    : `<strong>Soporte:</strong> No incluido`;

  const metricCards = [
    { l:"Creditos totales", v:fmt(totalCredits), c:"#1D4ED8" },
    { l:"Total venta", v:fmtView(totalRevenue), c:"#0F172A", s:isVES ? fmtUSDsm(totalRevenue) : "" },
    { l:"Costo proveedor", v:fmtUSDsm(totalCost), c:"#475569" },
    { l:"Margen bruto", v:fmtUSDsm(totalMargin), c:mC(marginPct) },
    { l:"Rentabilidad", v:`${marginPct.toFixed(1)}%`, c:mC(marginPct) },
  ].map(k => `
    <div class="metric-card avoid-break">
      <div class="metric-label">${k.l}</div>
      <div class="metric-value" style="color:${k.c}">${k.v}</div>
      ${k.s ? `<div class="metric-sub">${k.s}</div>` : ""}
    </div>`).join("");

  const html = `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<title>Análisis Vision One${clientName ? " - " + clientName : ""}</title>
<style>
  *{box-sizing:border-box;margin:0;padding:0}
  body{font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;color:#0F172A;background:#fff;font-size:12px;padding:0}
  .container{width:800px;margin:0 auto}
  .pdf-page{width:800px;min-height:1120px;padding:18px 24px;background:#fff;display:flex;flex-direction:column}
  .pdf-page + .pdf-page{page-break-before:always;break-before:page}
  .mono{font-family:"SF Mono","Roboto Mono","Fira Mono",monospace}
  .avoid-break{break-inside:avoid;page-break-inside:avoid;-webkit-column-break-inside:avoid;page-break-before:auto;page-break-after:auto}
  .top-rule{height:4px;background:linear-gradient(90deg,#082F49 0%,#0E7490 58%,#E11D2E 100%);border-radius:999px;margin-bottom:10px}
  .hero{background:linear-gradient(135deg,#082F49 0%,#0A3A55 62%,#0E5675 100%);border-radius:17px;padding:15px 18px 14px;color:#fff;margin-bottom:10px;position:relative;overflow:hidden;box-shadow:0 12px 28px rgba(8,47,73,.14)}
  .hero:before{content:"";position:absolute;inset:0;background:radial-gradient(circle at 91% 6%,rgba(255,255,255,.12),transparent 29%),linear-gradient(110deg,transparent 0%,transparent 63%,rgba(255,255,255,.055) 63%,rgba(255,255,255,.055) 100%)}
  .hero:after{content:"";position:absolute;left:18px;right:18px;bottom:0;height:1px;background:linear-gradient(90deg,rgba(255,255,255,.18),rgba(255,255,255,.04))}
  .brand-row{display:flex;align-items:center;justify-content:space-between;gap:18px;position:relative;z-index:1}
  .brand-left{display:flex;align-items:center;gap:12px}
  .brand-right{display:flex;align-items:center;gap:12px}
  .brand-mark{display:flex;align-items:center;justify-content:flex-start;width:148px;height:34px}
  .brand-mark img{max-height:31px;max-width:144px;object-fit:contain;object-position:left center}
  .trendai-logo{display:block;width:122px;max-height:30px;object-fit:contain}
  .brand-text{font-size:10px;color:#BAE6FD;font-weight:800;letter-spacing:.08em;text-transform:uppercase}
  .hero-title-row{display:flex;align-items:flex-end;justify-content:space-between;gap:22px;margin-top:12px;position:relative;z-index:1}
  .hero h1{font-size:24px;line-height:1.05;letter-spacing:-.035em;margin-bottom:4px}
  .hero p{font-size:11.5px;color:#D8F3FF;max-width:510px;line-height:1.38}
  .hero-note{min-width:172px;border:1px solid rgba(255,255,255,.2);background:rgba(255,255,255,.095);border-radius:12px;padding:8px 10px;text-align:right}
  .hero-note span{display:block;font-size:8px;font-weight:850;letter-spacing:.09em;text-transform:uppercase;color:#BAE6FD;margin-bottom:3px}
  .hero-note strong{display:block;font-size:12px;color:#fff;line-height:1.2}
  .confidential{display:inline-flex;align-items:center;background:rgba(255,255,255,.13);border:1px solid rgba(255,255,255,.22);border-radius:999px;padding:5px 9px;font-size:9px;font-weight:800;letter-spacing:.05em;text-transform:uppercase;color:#E0F2FE;white-space:nowrap}
  .doc-meta{display:grid;grid-template-columns:1.3fr 1fr 1fr 1fr;gap:7px;margin-bottom:10px}
  .meta-item{border:1px solid #E2E8F0;border-radius:10px;background:#F8FAFC;padding:8px 10px;min-height:55px}
  .label,.metric-label{font-size:8.5px;font-weight:800;color:#64748B;text-transform:uppercase;letter-spacing:.08em;margin-bottom:4px}
  .meta-value{font-size:11px;font-weight:750;color:#0F172A;line-height:1.3}
  .meta-sub,.metric-sub{font-size:9px;color:#94A3B8;margin-top:2px}
  .section-label{font-size:8.5px;font-weight:850;color:#64748B;text-transform:uppercase;letter-spacing:.09em;margin:0 0 5px 2px}
  .metrics{display:grid;grid-template-columns:repeat(5,1fr);gap:8px;margin-bottom:10px}
  .metric-card{border:1px solid #DDE7EF;border-radius:12px;background:linear-gradient(180deg,#FFFFFF 0%,#F8FAFC 100%);padding:9px 10px;min-height:62px;position:relative;overflow:hidden}
  .metric-card:before{content:"";position:absolute;left:0;right:0;top:0;height:3px;background:linear-gradient(90deg,#0E7490,#1D4ED8)}
  .metric-value{font-family:"SF Mono","Roboto Mono","Fira Mono",monospace;font-size:14px;font-weight:850;letter-spacing:-.02em}
  .section{border:1px solid #DDE7EF;border-radius:14px;background:#fff;overflow:hidden;box-shadow:0 6px 18px rgba(15,23,42,.035)}
  .section-heading{display:flex;align-items:center;justify-content:space-between;gap:14px;padding:10px 12px;border-bottom:1px solid #E2E8F0;background:linear-gradient(180deg,#F8FAFC 0%,#FFFFFF 100%)}
  .eyebrow{font-size:8.5px;font-weight:850;color:#64748B;text-transform:uppercase;letter-spacing:.09em;margin-bottom:3px}
  h2{font-size:13.5px;letter-spacing:-.015em;color:#0F172A}
  .status-pill{background:#E0F2FE;color:#075985;border:1px solid #BAE6FD;border-radius:999px;padding:4px 8px;font-size:9px;font-weight:800;white-space:nowrap}
  table{width:100%;border-collapse:collapse}
  th{padding:7px 7px;text-align:left;font-size:8px;font-weight:850;color:#E0F2FE;text-transform:uppercase;letter-spacing:.055em;background:#082F49}
  th.num{text-align:right}
  .closing-grid{display:grid;grid-template-columns:.86fr 1.14fr;gap:8px;margin-top:8px}
  .support-line,.observations{border:1px solid #DDE7EF;border-radius:12px;background:#F8FAFC;padding:9px 11px;color:#334155;font-size:10.3px;line-height:1.42}
  .support-line{background:linear-gradient(180deg,#F8FAFC 0%,#FFFFFF 100%)}
  .observations{background:#F8FAFC}
  .observations-copy{display:block;margin-top:5px}
  .observations p{font-size:9.8px;line-height:1.42;color:#475569}
  .observations strong{color:#0F172A}
  .footer{margin-top:auto;padding-top:8px;border-top:1px solid #E2E8F0;display:flex;align-items:flex-end;justify-content:space-between;gap:16px;color:#64748B;font-size:9px;line-height:1.4}
  .footer strong{color:#0F172A}
  @page{margin:12mm 10mm;size:A4}
  @media print{body{padding:0;print-color-adjust:exact;-webkit-print-color-adjust:exact}.container{max-width:none}.pdf-page{min-height:277mm}.hero,.section,.metric-card,.observations,.support-line,.footer,.avoid-break{break-inside:avoid;page-break-inside:avoid}}
</style>
</head>
<body>
  <div class="container pdf-content">
    <section class="pdf-page">
      <div class="top-rule"></div>
      <section class="hero avoid-break">
        <div class="brand-row">
          <div class="brand-left">
            <div class="brand-mark"><img src="${NEXTCOM_LOGO_REVERSE}" alt="Nextcom Systems" /></div>
            <div class="brand-text">Trend Vision One</div>
          </div>
          <div class="brand-right">
            <img src="${trendAiPdfLogo}" alt="TrendAI" class="trendai-logo" />
            <div class="confidential">Confidencial · Uso interno</div>
          </div>
        </div>
        <div class="hero-title-row">
          <div>
            <h1>Análisis interno</h1>
            <p>Reporte ejecutivo de rentabilidad, dimensionamiento y control comercial.</p>
          </div>
          <div class="hero-note">
            <span>Documento</span>
            <strong>Financiero interno</strong>
          </div>
        </div>
      </section>

      <section class="doc-meta avoid-break">
        <div class="meta-item">
          <div class="label">Cliente</div>
          <div class="meta-value">${clientName || "Cliente no especificado"}</div>
        </div>
        <div class="meta-item">
          <div class="label">Fecha de emisión</div>
          <div class="meta-value">${today}</div>
        </div>
        <div class="meta-item">
          <div class="label">Moneda</div>
          <div class="meta-value">${currency}</div>
          ${isVES ? `<div class="meta-sub">${rateSource.toUpperCase()} · Bs. ${activeRate.toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2})} por USD</div>` : `<div class="meta-sub">Valores comerciales en USD</div>`}
        </div>
        <div class="meta-item">
          <div class="label">Póliza de soporte</div>
          <div class="meta-value">${supportIncluded ? selectedSupportPolicy : "No incluido"}</div>
          ${soporteDate ? `<div class="meta-sub">Vence ${soporteDate}</div>` : ""}
        </div>
      </section>

      <div class="section-label">KPIs principales</div>
      <section class="metrics avoid-break">${metricCards}</section>

      <section class="section">
        <div class="section-heading">
          <div>
            <div class="eyebrow">Detalle de productos</div>
            <h2>Productos y créditos analizados</h2>
          </div>
          <div class="status-pill">${active.length} ${active.length === 1 ? "producto" : "productos"}</div>
        </div>
        <table>
          <thead>
            <tr>
              <th style="width:22%">Producto</th>
              <th style="width:14%">SKU / Categoría</th>
              <th style="width:12%">Vigencia</th>
              <th class="num" style="width:7%">Cant.</th>
              <th class="num" style="width:9%">Créditos</th>
              <th class="num" style="width:10%">Precio cliente</th>
              <th class="num" style="width:10%">Costo prov.</th>
              <th class="num" style="width:8%">Margen</th>
              <th class="num" style="width:8%">Subtotal</th>
            </tr>
          </thead>
          <tbody>${rowsHTML || `<tr><td colspan="9" style="padding:18px;text-align:center;color:#64748B;font-size:12px">No hay productos activos en este análisis.</td></tr>`}</tbody>
        </table>
      </section>

      <section class="closing-grid avoid-break">
        <div class="support-line">
          <div class="eyebrow">Soporte</div>
          <h2 style="margin-bottom:5px">Resumen compacto</h2>
          <p>${supportSummaryHTML}</p>
        </div>

        <div class="observations">
          <div class="eyebrow">Observaciones internas</div>
          <h2>Notas de revisión</h2>
          <div class="observations-copy">
            <p><strong>Sin observaciones adicionales registradas.</strong></p>
            <p style="margin-top:4px">Validar contra cotización final antes de compartir o aprobar.</p>
            <p style="margin-top:4px">El detalle comercial del alcance por producto, soporte, condiciones y certificaciones está disponible en la descarga &ldquo;Alcance para cliente&rdquo;.</p>
          </div>
        </div>
      </section>

      <footer class="footer avoid-break">
        <div>
          <strong>Nextcom Systems · Documento confidencial de uso interno · No distribuir externamente</strong><br>
          RUC 1253816-1-593861 DV 16 · +507 394-1405
        </div>
        <div>Generado por Calculadora Vision One</div>
      </footer>
    </section>
  </div>
</body>
</html>`;

  const fname = `Analisis_VisionOne_${(clientName || "Nextcom").replace(/\s+/g, "_")}_${new Date().toISOString().split("T")[0]}.pdf`;

  // Generar PDF real desde el HTML
  return generatePdfFromHtml(html, fname).catch(err => {
    console.error("Error generando PDF:", err);
    alert("No se pudo generar el PDF. Por favor verifica tu conexión a internet e inténtalo de nuevo.\n\nDetalle: " + err.message);
    throw err;
  });
}

async function downloadClientScopeReportRasterLegacy(data) {
  const { lines, soporteSale, soporteCost, soporteDate, clientName, supportPolicy = "Platinum", technicalScope = {} } = data;
  const today = new Date().toLocaleDateString("es-PA", { year:"numeric", month:"long", day:"numeric" });
  const trendAiPdfLogo = await pdfAssetToDataUrl(trendAiSidebarLogo);
  const iso9001PdfLogo = await pdfAssetToDataUrl(iso9001Logo);
  const iso27001PdfLogo = await pdfAssetToDataUrl(iso27001Logo);
  const escapeScopeText = value => String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
  const optionalScopeText = value => value?.trim() ? escapeScopeText(value.trim()) : "No especificado";
  const renderTechnicalList = items => `
      <ul class="technical-list">${items.map(item => `<li>${escapeScopeText(item)}</li>`).join("")}</ul>`;
  const active = lines.filter(l => l.prodId && l.qty > 0).map(l => {
    const p = CATALOG.find(c => c.id===l.prodId);
    const months = monthsBetween(l.startDate, l.date);
    const prorated = Math.round(l.qty * p.credits * (months / 12));
    return { ...l, prod:p, months, prorated, baseTotal: l.qty * p.credits, isProrated: Math.abs(months - 12) > 0.1 };
  });
  const totalCredits = active.reduce((sum, line) => sum + line.prorated, 0);
  const formatScopeDate = value => {
    if (!value) return "No especificado";
    const [year, month, day] = value.split("-").map(Number);
    if (!year || !month || !day) return escapeScopeText(value);
    return new Date(year, month - 1, day).toLocaleDateString("es-PA", { day:"2-digit", month:"short", year:"numeric" });
  };
  const coverageStart = active.map(line => line.startDate).filter(Boolean).sort()[0];
  const coverageEnd = active.map(line => line.date).filter(Boolean).sort().at(-1);
  const coverageLabel = active.length > 0
    ? `${formatScopeDate(coverageStart)} - ${formatScopeDate(coverageEnd)}`
    : "Según vigencias de productos incluidos";
  const selectedSupportPolicy = normalizeSupportPolicy(supportPolicy);
  const supportPolicyScope = getSupportPolicyScope(selectedSupportPolicy);
  const supportIncluded = soporteSale > 0 || soporteCost > 0;
  const technicalObjectives = [
    "Fortalecer la postura de ciberseguridad del cliente mediante las capacidades incluidas en Trend Vision One / TrendAI.",
    "Centralizar visibilidad, prevención, detección y respuesta sobre los productos dimensionados.",
    "Reducir exposición operativa mediante monitoreo, priorización de riesgos y controles de seguridad según los módulos incluidos.",
    "Alinear el uso de créditos y servicios con el alcance técnico definido en la propuesta.",
  ];
  const technicalScopes = [
    "Implementación y/o habilitación de las capacidades asociadas a los productos incluidos.",
    "Uso de créditos Vision One según las cantidades dimensionadas.",
    "Cobertura técnica sobre los módulos seleccionados en la propuesta.",
    supportIncluded
      ? `Alcance de soporte según la póliza ${selectedSupportPolicy} seleccionada.`
      : "Soporte comercial Nextcom no incluido en la propuesta.",
  ];
  const selectedProductText = active.map(line => `${line.prod.cat || ""} ${line.prod.name || ""}`.toLowerCase());
  [
    { pattern:/endpoint|edr/, text:"Cobertura sobre capacidades de Endpoint Security incluidas en el dimensionamiento." },
    { pattern:/email|collaboration/, text:"Cobertura sobre capacidades de Email and Collaboration Security incluidas en el dimensionamiento." },
    { pattern:/zero trust|ztsa/, text:"Cobertura sobre capacidades de Zero Trust Secure Access incluidas en el dimensionamiento." },
    { pattern:/cloud risk management/, text:"Cobertura sobre capacidades de Cloud Risk Management incluidas en el dimensionamiento." },
    { pattern:/cyber risk exposure/, text:"Cobertura sobre capacidades de Cyber Risk Exposure Management incluidas en el dimensionamiento." },
    { pattern:/vision one credits|créditos vision one|credits/, text:"Uso del pool de Trend Vision One Credits conforme a los créditos dimensionados." },
  ].forEach(family => {
    if (selectedProductText.some(product => family.pattern.test(product))) technicalScopes.push(family.text);
  });
  const technicalDeliverables = [
    "Productos y capacidades habilitadas según el alcance aprobado.",
    "Documento de alcance técnico de productos, cantidades, vigencias y créditos.",
    supportIncluded
      ? `Soporte según la póliza ${selectedSupportPolicy} seleccionada.`
      : "Confirmación de que la propuesta no incluye una póliza de soporte Nextcom.",
    "Transferencia de información operativa necesaria para el uso del servicio.",
    "Validación de condiciones y consideraciones aplicables.",
  ];
  const getScopeItemRangeLabel = (items, offset = 0) => {
    if (items.length === 0) return "Sin ítems";
    const firstItem = offset + 1;
    const lastItem = offset + items.length;
    return items.length === 1 ? `Ítem ${firstItem}` : `Ítems ${firstItem}-${lastItem}`;
  };
  const getScopeVisualWeight = (line) => {
    const scope = getVisionOneProductScope(line);
    const visibleTextLength = [
      scope.title,
      scope.summary,
      ...scope.includes.slice(0, 3),
      scope.businessValue,
      scope.notes || "",
    ].join(" ").length;

    if (visibleTextLength > 1050) return 3;
    if (visibleTextLength > 760) return 1.5;
    return 1;
  };
  const groupScopeProducts = (items) => {
    if (items.length === 0) return [[]];

    const groups = [];
    let currentGroup = [];
    let currentWeight = 0;

    items.forEach((item) => {
      const itemWeight = getScopeVisualWeight(item);
      const exceedsItemLimit = currentGroup.length >= 3;
      const exceedsPageWeight = currentWeight + itemWeight > 3;

      if (currentGroup.length > 0 && (exceedsItemLimit || exceedsPageWeight)) {
        groups.push(currentGroup);
        currentGroup = [];
        currentWeight = 0;
      }

      currentGroup.push(item);
      currentWeight += itemWeight;
    });

    if (currentGroup.length > 0) groups.push(currentGroup);
    if (groups.length > 1 && groups.at(-1).length === 1 && groups.at(-2).length === 3) {
      groups.at(-1).unshift(groups.at(-2).pop());
    }
    return groups;
  };
  const renderScopeSlimHeader = (pageLabel) => `
      <section class="scope-slim-header avoid-break">
        <div class="scope-slim-brand">
          <img src="${NEXTCOM_LOGO}" alt="Nextcom Systems" />
          <span>Propuesta técnica y alcance del servicio</span>
        </div>
        <div class="scope-slim-actions">
          <div class="scope-slim-trendai" aria-label="TrendAI">
            <span class="scope-slim-trendai-symbol"><img src="${trendAiPdfLogo}" alt="" /></span>
            <span class="scope-slim-trendai-wordmark">TrendAI</span>
          </div>
          <div class="scope-slim-badge">${pageLabel}</div>
        </div>
      </section>`;
  const coverContactDetails = [
    technicalScope.contactRole,
    technicalScope.contactEmail,
    technicalScope.contactPhone,
  ].filter(value => value?.trim()).map(value => escapeScopeText(value.trim())).join(" · ");
  const technicalCoverHTML = () => `
      <section class="pdf-page technical-title-page">
        <div class="technical-cover-pattern" aria-hidden="true"></div>
        <div class="technical-cover-wave-back" aria-hidden="true"></div>
        <div class="technical-cover-wave-front" aria-hidden="true"></div>
        <div class="technical-cover-red-accent" aria-hidden="true"></div>
        <header class="technical-cover-brand">
          <img src="${NEXTCOM_LOGO}" alt="Nextcom Systems" class="technical-cover-nextcom" />
          <div class="technical-cover-trendai" aria-label="TrendAI">
            <span><img src="${trendAiPdfLogo}" alt="" /></span>
            <strong>TrendAI</strong>
          </div>
        </header>

        <div class="technical-cover-main">
          <div class="technical-cover-kicker">Trend Vision One / TrendAI</div>
          <h1>Propuesta técnica<br>y alcance del servicio</h1>
          <div class="technical-cover-rule"></div>
          <p>Soluciones de ciberseguridad, productos, créditos y soporte considerados para la propuesta técnica del cliente.</p>
        </div>

        <section class="technical-cover-meta">
          <div class="technical-cover-meta-item">
            <span class="technical-cover-label">Cliente</span>
            <strong>${clientName ? escapeScopeText(clientName) : "Cliente no especificado"}</strong>
          </div>
          <div class="technical-cover-meta-item">
            <span class="technical-cover-label">Fecha de emisión</span>
            <strong>${today}</strong>
          </div>
          <div class="technical-cover-meta-item technical-cover-meta-contact">
            <span class="technical-cover-label">Contacto principal</span>
            <strong>${optionalScopeText(technicalScope.contactName)}</strong>
            <small>${coverContactDetails || "No especificado"}</small>
          </div>
          <div class="technical-cover-meta-item">
            <span class="technical-cover-label">Tipo de documento</span>
            <strong>Alcance técnico</strong>
            <small>Propuesta referencial</small>
          </div>
        </section>

        <section class="technical-cover-contents">
          ${[
            ["RT", "Resumen técnico"],
            ["AP", "Alcance por producto"],
            ["SP", "Soporte"],
            ["CD", "Condiciones"],
            ["ISO", "Certificaciones"],
          ].map(([icon, label]) => `
            <div>
              <span class="technical-cover-content-icon">${icon}</span>
              <strong>${label}</strong>
            </div>`).join("")}
        </section>

        <footer class="technical-cover-footer">
          <div>
            <strong>Nextcom Systems</strong>
            <span>nextcom.com</span>
          </div>
          <div>
            <strong>Conectamos tecnología, potenciamos negocios.</strong>
          </div>
          <div>
            <span>${today}</span>
            <span>Versión 1.0</span>
          </div>
        </footer>
      </section>`;
  const technicalProposalHTML = `
      <section class="technical-section">
        <div class="technical-section-heading">
          <span>02</span>
          <h2>Propuesta técnica</h2>
        </div>
        <div class="technical-proposal-grid">
          <div class="technical-proposal-card avoid-break">
            <div class="label">Objetivos del servicio</div>
            ${renderTechnicalList(technicalObjectives)}
          </div>
          <div class="technical-proposal-card avoid-break">
            <div class="label">Alcance funcional</div>
            ${renderTechnicalList(technicalScopes)}
          </div>
          <div class="technical-proposal-card avoid-break">
            <div class="label">Entregables</div>
            ${renderTechnicalList(technicalDeliverables)}
          </div>
        </div>
      </section>`;
  const executiveSummaryHTML = `
      <section class="executive-section">
        <div class="executive-heading">
          <div>
            <div class="eyebrow">01 · Resumen técnico</div>
            <h1>Resumen ejecutivo</h1>
          </div>
          <p>Dimensionamiento consolidado de productos, servicios, créditos y cobertura considerados para esta propuesta.</p>
        </div>

        <div class="executive-kpis avoid-break">
          ${[
            ["Créditos totales Vision One", fmt(totalCredits)],
            ["Productos / servicios", active.length.toLocaleString("en-US")],
            ["Póliza de soporte", supportIncluded ? supportPolicyScope.label : "No incluido"],
            ["Vigencia referencial", coverageLabel],
          ].map(([label, value]) => `
            <div class="executive-kpi">
              <span>${label}</span>
              <strong>${value}</strong>
            </div>`).join("")}
        </div>

        <div class="executive-table-wrap avoid-break">
          <div class="executive-table-title">Resumen de productos y créditos</div>
          <table class="executive-table">
            <thead>
              <tr>
                <th>Producto / servicio</th>
                <th>SKU / categoría</th>
                <th>Cantidad</th>
                <th>Créditos</th>
                <th>Vigencia</th>
              </tr>
            </thead>
            <tbody>
              ${active.length > 0 ? active.map(line => `
                <tr>
                  <td>${escapeScopeText(line.prod.name)}</td>
                  <td>${escapeScopeText(line.prod.sku || line.prod.cat)}</td>
                  <td>${line.qty.toLocaleString("en-US")}</td>
                  <td>${fmt(line.prorated)}</td>
                  <td>${line.startDate || "Sin inicio"} - ${line.date || "Sin fin"}</td>
                </tr>`).join("") : `
                <tr>
                  <td colspan="5" class="executive-empty">No hay productos activos asociados a esta propuesta.</td>
                </tr>`}
            </tbody>
          </table>
        </div>
      </section>`;
  const renderScopeItems = (items, offset = 0) => items.length > 0 ? items.map((l, i) => {
    const scope = getVisionOneProductScope(l);
    return `
    <div class="scope-item avoid-break">
      <div class="scope-item-index">${String(offset + i + 1).padStart(2, "0")}</div>
      <div class="scope-item-body">
        <div class="scope-item-title">${l.prod.name}</div>
        <div class="scope-item-meta">
          <span>${l.prod.sku || l.prod.cat}</span>
          <span>${l.qty.toLocaleString("en-US")} ${l.prod.unit}${l.qty !== 1 ? "s" : ""}</span>
          <span>${l.startDate || "Sin inicio"} - ${l.date || "Sin fin"}</span>
          <span>${fmt(l.prorated)} créditos</span>
        </div>
        <div class="scope-product-title">${scope.title}</div>
        <p class="scope-summary">${scope.summary}</p>
        <ul class="scope-bullets">
          ${scope.includes.slice(0, 3).map(item => `<li>${item}</li>`).join("")}
        </ul>
        <div class="scope-business"><strong>Valor para el negocio:</strong> ${scope.businessValue}</div>
        ${scope.notes ? `<div class="scope-item-note">${scope.notes}</div>` : ""}
      </div>
    </div>`;
  }).join("") : `
    <div class="scope-empty avoid-break">No hay productos activos asociados a este alcance.</div>`;
  const renderScopeProductSection = (items, offset = 0) => `
      <section class="scope-card scope-product-card avoid-break">
        <div class="scope-card-header">
          <div>
            <div class="eyebrow">03 · Alcance por producto</div>
            <h2>Alcance por ítem de servicio</h2>
          </div>
        </div>
        <div class="scope-card-body">
          ${renderScopeItems(items, offset)}
        </div>
      </section>`;
  const supportScopeHTML = supportIncluded ? `
      <section class="scope-card avoid-break">
        <div class="scope-card-header">
          <div>
            <div class="eyebrow">04 · Soporte según póliza</div>
            <h2>Póliza de soporte: ${supportPolicyScope.label}</h2>
          </div>
          <div class="status-pill">${supportPolicyScope.label}</div>
        </div>
        <div class="scope-card-body">
          <ul class="support-list">
            ${supportPolicyScope.bullets.map(item => `<li>${item}</li>`).join("")}
          </ul>
          ${soporteDate ? `<div class="scope-note">Vigencia referencial del soporte hasta ${soporteDate}.</div>` : `<div class="scope-note">${supportPolicyScope.note}</div>`}
        </div>
      </section>` : `
      <section class="scope-card avoid-break">
        <div class="scope-card-header">
          <div>
            <div class="eyebrow">04 · Soporte según póliza</div>
            <h2>Soporte no incluido</h2>
          </div>
          <div class="status-pill">No incluido</div>
        </div>
        <div class="scope-card-body">
          <div class="scope-empty avoid-break">Esta propuesta no incluye una póliza de soporte comercial asociada. Si el negocio requiere soporte Nextcom, debe agregarse como línea comercial y seleccionar el nivel de póliza aplicable.</div>
        </div>
      </section>`;
  const scopeTailHTML = `
      <section class="scope-tail-heading avoid-break">
        <div class="eyebrow">Cierre técnico</div>
        <h1>Soporte, condiciones y certificaciones</h1>
        <p>Resumen de la cobertura de soporte, consideraciones aplicables y certificaciones de Nextcom.</p>
      </section>

      ${supportScopeHTML}

      <section class="scope-split">
        <div class="scope-card avoid-break">
          <div class="scope-card-header">
            <div>
              <div class="eyebrow">05 · Consideraciones</div>
              <h2>Consideraciones del alcance</h2>
            </div>
          </div>
          <div class="scope-card-body">
            <ul class="consideration-list" style="grid-template-columns:1fr">
              <li>El alcance aplica únicamente sobre los productos, servicios y cantidades expresamente incluidos en la propuesta.</li>
              <li>La activación final de licencias, créditos o servicios queda sujeta a validación técnica, comercial y disponibilidad del fabricante cuando aplique.</li>
              <li>Actividades fuera del alcance, cambios realizados por terceros o servicios profesionales adicionales podrán cotizarse por separado.</li>
              <li>La atención presencial fuera del área metropolitana o condiciones especiales de traslado pueden requerir validación comercial adicional.</li>
              <li>Este documento es referencial y debe validarse contra la cotización final emitida por Nextcom.</li>
            </ul>
          </div>
        </div>

        <div class="scope-card avoid-break">
          <div class="scope-card-header">
            <div>
              <div class="eyebrow">06 · Certificaciones</div>
              <h2>Certificaciones Nextcom</h2>
            </div>
          </div>
          <div class="scope-card-body">
            <div class="iso-logos">
              <div class="iso-logo-card"><img src="${iso9001PdfLogo}" alt="ISO 9001" /></div>
              <div class="iso-logo-card"><img src="${iso27001PdfLogo}" alt="ISO/IEC 27001" /></div>
            </div>
            <p class="certification-copy" style="margin-top:8px">Nextcom cuenta con certificaciones de gestión de calidad ISO 9001 y seguridad de la información ISO/IEC 27001 como parte de su Sistema Integrado de Gestión.</p>
          </div>
        </div>
      </section>
      <footer class="footer avoid-break">
        <div>
          <strong style="color:#0F172A">Nextcom Systems</strong><br>
          Documento generado por Calculadora Vision One<br>
          RUC 1253816-1-593861 DV 16 · +507 394-1405
        </div>
        <div class="disclaimer avoid-break">
          El análisis financiero, márgenes y precios forman parte del documento interno de análisis y cotización.
        </div>
      </footer>`;
  const summaryPageProducts = active.slice(0, 1);
  const remainingScopeProducts = active.slice(summaryPageProducts.length);
  const productScopeChunks = remainingScopeProducts.length > 0 ? groupScopeProducts(remainingScopeProducts) : [];
  const scopeChunkOffsets = productScopeChunks.map((_, chunkIndex) =>
    productScopeChunks.slice(0, chunkIndex).reduce((total, chunk) => total + chunk.length, 0)
  );
  const totalPageCount = 3 + productScopeChunks.length;
  const technicalCoverPagesHTML = technicalCoverHTML();
  const executiveAndProposalHTML = `
    <section class="pdf-page scope-page scope-page-compact executive-page ${summaryPageProducts.length > 0 ? `executive-page-with-products executive-page-with-${summaryPageProducts.length}-products` : "executive-page-full"}">
      ${renderScopeSlimHeader(`Página 2 de ${totalPageCount}`)}
      ${executiveSummaryHTML}
      ${technicalProposalHTML}
      ${summaryPageProducts.length > 0 ? renderScopeProductSection(summaryPageProducts, 0) : ""}
    </section>`;
  const productScopePagesHTML = productScopeChunks.map((chunk, chunkIndex) => {
    const itemOffset = scopeChunkOffsets[chunkIndex];
    return `
    <section class="pdf-page scope-page scope-page-compact scope-product-page scope-product-page-${chunk.length}">
      ${renderScopeSlimHeader(getScopeItemRangeLabel(chunk, itemOffset))}
      ${renderScopeProductSection(chunk, itemOffset)}
    </section>`;
  }).join("");
  const standaloneScopeTailHTML = `
    <section class="pdf-page scope-page scope-tail-page">
      ${renderScopeSlimHeader("Cierre técnico")}
      ${scopeTailHTML}
    </section>`;

  const html = `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<title>Propuesta técnica y alcance del servicio${clientName ? " - " + clientName : ""}</title>
<style>
  *{box-sizing:border-box;margin:0;padding:0}
  body{font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;color:#0F172A;background:#fff;font-size:12px;padding:0}
  .container{width:800px;margin:0 auto}
  .pdf-page{width:800px;min-height:1120px;padding:16px 22px;background:#fff;position:relative;isolation:isolate}
  .pdf-page:before{content:"";position:absolute;inset:0;background:#fff;z-index:0}
  .pdf-page>*{position:relative;z-index:1}
  .pdf-page + .pdf-page{page-break-before:always;break-before:page}
  .avoid-break{break-inside:avoid;page-break-inside:avoid;-webkit-column-break-inside:avoid;page-break-before:auto;page-break-after:auto}
  .scope-page{display:flex;flex-direction:column;gap:6px}
  .scope-page-compact{padding-top:6px;gap:4px}
  .technical-title-page{padding:0;display:flex;flex-direction:column;overflow:hidden;background:#fff}
  .technical-cover-pattern{position:absolute;right:52px;top:105px;width:260px;height:250px;opacity:.3;background-image:radial-gradient(circle,#7DD3FC 1.2px,transparent 1.2px);background-size:18px 18px;z-index:1}
  .technical-cover-wave-back{position:absolute;left:-110px;bottom:8px;width:1020px;height:340px;border-radius:52% 48% 0 0 / 45% 40% 0 0;background:#E0F2FE;z-index:1}
  .technical-cover-wave-front{position:absolute;left:-100px;bottom:-44px;width:1010px;height:292px;border-radius:50% 50% 0 0 / 42% 48% 0 0;background:linear-gradient(110deg,#082F49 0%,#0F4C6B 68%,#126389 100%);z-index:1}
  .technical-cover-red-accent{position:absolute;left:64px;top:442px;width:74px;height:4px;border-radius:999px;background:#E31B2B;z-index:2}
  .technical-cover-brand{display:flex;align-items:center;justify-content:space-between;padding:50px 64px 0;z-index:2}
  .technical-cover-nextcom{display:block;width:150px;height:48px;object-fit:contain;object-position:left center}
  .technical-cover-trendai{display:flex;align-items:center;justify-content:flex-end;gap:7px;height:40px;color:#082F49}
  .technical-cover-trendai span{position:relative;width:35px;height:35px;overflow:hidden;flex:0 0 auto}
  .technical-cover-trendai span img{position:absolute;left:0;top:0;width:153px;height:35px;max-width:none;object-fit:contain;object-position:left center}
  .technical-cover-trendai strong{font-size:22px;line-height:1;font-weight:850;letter-spacing:-.025em}
  .technical-cover-main{width:650px;margin:116px 0 0 64px;z-index:2}
  .technical-cover-kicker{font-size:11px;font-weight:850;letter-spacing:.15em;text-transform:uppercase;color:#E31B2B;margin-bottom:16px}
  .technical-cover-main h1{font-size:46px;line-height:1.03;letter-spacing:-.045em;color:#082F49;max-width:650px}
  .technical-cover-rule{display:none}
  .technical-cover-main p{font-size:15px;line-height:1.55;color:#475569;max-width:610px;margin-top:34px}
  .technical-cover-meta{width:672px;margin:66px auto 0;border:1px solid #D7E2EA;border-radius:14px;background:rgba(255,255,255,.96);box-shadow:0 10px 28px rgba(8,47,73,.08);display:grid;grid-template-columns:1fr .85fr 1.35fr 1fr;z-index:2}
  .technical-cover-meta-item{min-width:0;padding:13px 14px;border-right:1px solid #E2E8F0}
  .technical-cover-meta-item:last-child{border-right:0}
  .technical-cover-label{display:block;font-size:8.5px;font-weight:850;letter-spacing:.12em;text-transform:uppercase;color:#64748B;margin-bottom:6px}
  .technical-cover-meta-item strong{display:block;font-size:11.5px;line-height:1.3;color:#0F172A;overflow-wrap:anywhere}
  .technical-cover-meta-item small{display:block;font-size:8.8px;line-height:1.35;color:#64748B;margin-top:4px;overflow-wrap:anywhere}
  .technical-cover-contents{width:672px;margin:18px auto 0;padding:10px 12px;border-top:1px solid #D7E2EA;border-bottom:1px solid #D7E2EA;display:grid;grid-template-columns:repeat(5,1fr);gap:8px;z-index:2}
  .technical-cover-contents>div{display:flex;align-items:center;gap:7px;min-width:0}
  .technical-cover-content-icon{display:flex;align-items:center;justify-content:center;width:27px;height:27px;border-radius:999px;background:#E0F2FE;color:#075985;font-size:7.5px;font-weight:900;letter-spacing:.02em;flex:0 0 auto}
  .technical-cover-contents strong{font-size:9px;line-height:1.25;color:#334155}
  .technical-cover-footer{margin-top:auto;padding:0 64px 30px;display:grid;grid-template-columns:1fr 1.35fr .75fr;gap:24px;align-items:end;color:#fff;z-index:3}
  .technical-cover-footer div{display:flex;flex-direction:column;gap:4px}
  .technical-cover-footer div:last-child{align-items:flex-end;text-align:right}
  .technical-cover-footer strong{font-size:10.5px;line-height:1.35;color:#fff}
  .technical-cover-footer span{font-size:9px;line-height:1.35;color:#D8F3FF}
  .scope-doc-header{background:linear-gradient(135deg,#082F49 0%,#0F3B57 58%,#124C6B 100%);border-radius:16px;color:#fff;padding:12px 16px;position:relative;overflow:hidden}
  .scope-doc-header:after{content:"";position:absolute;right:-74px;top:-88px;width:230px;height:230px;border-radius:999px;background:rgba(255,255,255,.07)}
  .scope-hero{background:linear-gradient(135deg,#082F49 0%,#0F3B57 58%,#124C6B 100%);border-radius:18px;color:#fff;padding:18px 20px;position:relative;overflow:hidden}
  .scope-hero:after{content:"";position:absolute;right:-70px;top:-90px;width:230px;height:230px;border-radius:999px;background:rgba(255,255,255,.07)}
  .scope-hero-compact{padding:14px 18px;background:#082F49}
  .brand-row{display:flex;align-items:center;justify-content:space-between;gap:20px;margin-bottom:8px;position:relative;z-index:1}
  .brand-left{display:flex;align-items:center;gap:13px}
  .brand-mark{background:#fff;border-radius:12px;padding:7px 9px;display:flex;align-items:center;justify-content:center;min-width:118px;height:42px}
  .brand-mark img{max-height:26px;max-width:108px;object-fit:contain}
  .trendai-logo{display:block;width:142px;max-height:36px;object-fit:contain;position:relative;z-index:1}
  .brand-text{font-size:12px;color:#BAE6FD;font-weight:700;letter-spacing:.08em;text-transform:uppercase}
  .brand-sub{font-size:10.5px;color:#E0F2FE;font-weight:650;margin-top:3px}
  .scope-header-main{display:grid;grid-template-columns:1fr 200px;gap:18px;align-items:end;position:relative;z-index:1}
  .scope-doc-header h1{font-size:21px;line-height:1.1;letter-spacing:-.035em;margin:3px 0 5px}
  .scope-doc-header p{font-size:10.8px;line-height:1.38;color:#D8F3FF;max-width:540px}
  .scope-header-meta{background:rgba(255,255,255,.09);border:1px solid rgba(255,255,255,.14);border-radius:12px;padding:8px 10px;color:#E0F2FE}
  .scope-header-meta-row{display:flex;align-items:center;justify-content:space-between;gap:10px;padding-bottom:5px;margin-bottom:5px;border-bottom:1px solid rgba(255,255,255,.12)}
  .scope-header-meta-row span{font-size:8.5px;font-weight:850;letter-spacing:.09em;text-transform:uppercase;color:#BAE6FD}
  .scope-header-meta-row strong{font-size:10px;line-height:1.25;text-align:right;color:#fff}
  .page-badge{display:inline-flex;align-items:center;justify-content:center;width:100%;border-radius:999px;background:rgba(186,230,253,.16);border:1px solid rgba(186,230,253,.28);padding:5px 9px;color:#E0F2FE;font-size:9.5px;font-weight:850}
  .scope-slim-header{min-height:36px;display:flex;align-items:center;justify-content:space-between;gap:12px;border:1px solid #D7E2EA;border-radius:9px;background:#F8FAFC;padding:3px 7px}
  .scope-slim-brand{display:flex;align-items:center;gap:8px;min-width:0;color:#0F3B57;font-size:10px;font-weight:800;letter-spacing:.01em}
  .scope-slim-brand img{display:block;width:68px;height:22px;object-fit:contain}
  .scope-slim-actions{display:flex;align-items:center;justify-content:flex-end;gap:7px;flex:0 0 auto}
  .scope-slim-trendai{display:flex;align-items:center;gap:3px;height:19px;flex:0 0 auto}
  .scope-slim-trendai-symbol{position:relative;width:19px;height:19px;overflow:hidden;flex:0 0 auto}
  .scope-slim-trendai-symbol img{position:absolute;left:0;top:0;width:72px;height:19px;max-width:none;object-fit:contain;object-position:left center}
  .scope-slim-trendai-wordmark{color:#0F3B57;font-size:10.5px;font-weight:850;line-height:1}
  .scope-slim-badge{flex:0 0 auto;border:1px solid #BAE6FD;border-radius:999px;background:#E0F2FE;color:#075985;padding:3px 8px;font-size:9px;font-weight:850}
  .eyebrow{font-size:9px;font-weight:850;color:#64748B;text-transform:uppercase;letter-spacing:.09em;margin-bottom:4px}
  .scope-hero .eyebrow{color:#BAE6FD}
  .scope-hero h1{font-size:26px;line-height:1.1;letter-spacing:-.035em;margin:5px 0 7px;position:relative;z-index:1}
  .scope-hero-compact h1{font-size:20px;margin-bottom:5px}
  .scope-hero p{font-size:12px;line-height:1.45;color:#D8F3FF;max-width:650px;position:relative;z-index:1}
  .scope-context-strip{display:flex;align-items:center;justify-content:space-between;gap:9px;border:1px solid #E2E8F0;border-radius:12px;background:#F8FAFC;padding:7px 10px}
  .scope-context-item{display:flex;align-items:center;gap:7px;min-width:0;color:#475569;font-size:10.5px;line-height:1.35}
  .scope-context-item strong{color:#0F172A;font-size:11px;font-weight:800}
  .scope-context-dot{width:6px;height:6px;border-radius:999px;background:#0EA5E9;flex:0 0 auto}
  .doc-meta{display:grid;grid-template-columns:1.25fr 1fr 1fr 1fr;gap:10px}
  .meta-card{border:1px solid #E2E8F0;border-radius:14px;background:#fff;padding:12px 13px}
  .label{font-size:9px;font-weight:800;color:#64748B;text-transform:uppercase;letter-spacing:.08em;margin-bottom:6px}
  .meta-value{font-size:12px;font-weight:750;color:#0F172A;line-height:1.35}
  .meta-sub{font-size:10px;color:#94A3B8;margin-top:4px}
  .technical-cover-page{gap:8px;background-color:#fff;background-image:linear-gradient(#fff,#fff)}
  .technical-section{border:1px solid #E2E8F0;border-radius:13px;background:#fff;overflow:hidden}
  .technical-section-heading{display:flex;align-items:center;gap:9px;padding:8px 11px;border-bottom:1px solid #E2E8F0;background:#F8FAFC}
  .technical-section-heading span{display:flex;align-items:center;justify-content:center;width:23px;height:23px;border-radius:999px;background:#E0F2FE;border:1px solid #BAE6FD;color:#075985;font-family:"SF Mono","Roboto Mono",monospace;font-size:9px;font-weight:850}
  .technical-section-heading h2{font-size:13.5px;color:#0F172A;letter-spacing:-.015em}
  .technical-info-grid{display:grid;grid-template-columns:1.1fr 1.25fr .75fr;gap:0;padding:8px 11px}
  .technical-contact-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:0;padding:8px 11px}
  .technical-field{min-width:0;padding:3px 10px;border-right:1px solid #E2E8F0}
  .technical-field:first-child{padding-left:0}
  .technical-field:last-child{padding-right:0;border-right:0}
  .technical-field-wide{grid-column:1 / -1;border-right:0;border-top:1px solid #E2E8F0;margin-top:8px;padding:9px 0 2px}
  .technical-value{font-size:10.5px;font-weight:700;color:#0F172A;line-height:1.38;overflow-wrap:anywhere}
  .technical-copy{font-weight:500;color:#475569}
  .technical-proposal-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:0;padding:7px 10px}
  .technical-proposal-card{border:0;border-right:1px solid #E2E8F0;border-radius:0;background:#fff;padding:5px 11px;min-width:0}
  .technical-proposal-card:first-child{padding-left:2px}
  .technical-proposal-card:last-child{border-right:0;padding-right:2px}
  .technical-list{list-style:none;display:grid;gap:3px}
  .technical-list li{position:relative;padding-left:11px;font-size:9.6px;line-height:1.34;color:#475569;overflow-wrap:anywhere}
  .technical-list li:before{content:"";position:absolute;left:0;top:.55em;width:4px;height:4px;border-radius:999px;background:#1D4ED8}
  .technical-empty{font-size:10px;color:#94A3B8;line-height:1.4}
  .technical-page-spacer{flex:1;min-height:1px;background:#fff}
  .technical-footer{margin-top:0}
  .executive-section{border:1px solid #D7E2EA;border-radius:13px;background:#fff;overflow:hidden}
  .executive-heading{display:flex;align-items:flex-end;justify-content:space-between;gap:24px;padding:10px 12px;border-bottom:1px solid #E2E8F0;background:linear-gradient(90deg,#F8FAFC 0%,#fff 100%)}
  .executive-heading h1{font-size:18px;line-height:1.15;letter-spacing:-.025em;color:#082F49}
  .executive-heading p{max-width:390px;font-size:9.8px;line-height:1.4;color:#64748B;text-align:right}
  .executive-kpis{display:grid;grid-template-columns:repeat(4,1fr);gap:7px;padding:9px 10px}
  .executive-kpi{min-width:0;border-left:3px solid #0EA5E9;background:#F8FAFC;padding:7px 9px}
  .executive-kpi span{display:block;font-size:8px;font-weight:800;line-height:1.3;letter-spacing:.07em;text-transform:uppercase;color:#64748B}
  .executive-kpi strong{display:block;margin-top:4px;font-size:12px;line-height:1.3;color:#0F172A;overflow-wrap:anywhere}
  .executive-table-wrap{margin:0 10px 10px;border:1px solid #E2E8F0;border-radius:9px;overflow:hidden}
  .executive-table-title{padding:7px 9px;background:#082F49;color:#fff;font-size:10.5px;font-weight:800}
  .executive-table{width:100%;border-collapse:collapse;table-layout:fixed}
  .executive-table th{padding:6px 7px;background:#F1F5F9;border-bottom:1px solid #CBD5E1;color:#475569;font-size:7.8px;line-height:1.25;text-align:left;text-transform:uppercase;letter-spacing:.055em}
  .executive-table td{padding:6px 7px;border-bottom:1px solid #E2E8F0;color:#334155;font-size:8.8px;line-height:1.3;vertical-align:top;overflow-wrap:anywhere}
  .executive-table tr:last-child td{border-bottom:0}
  .executive-table th:nth-child(1),.executive-table td:nth-child(1){width:28%}
  .executive-table th:nth-child(2),.executive-table td:nth-child(2){width:19%}
  .executive-table th:nth-child(3),.executive-table td:nth-child(3){width:11%;text-align:right}
  .executive-table th:nth-child(4),.executive-table td:nth-child(4){width:11%;text-align:right}
  .executive-table th:nth-child(5),.executive-table td:nth-child(5){width:31%}
  .executive-empty{text-align:center!important;color:#94A3B8!important;padding:12px!important}
  .executive-page-full{gap:11px}
  .executive-page-full .executive-heading{padding:14px 14px 12px}
  .executive-page-full .executive-kpis{gap:9px;padding:12px}
  .executive-page-full .executive-kpi{padding:9px 10px}
  .executive-page-full .executive-table-wrap{margin:0 12px 12px}
  .executive-page-full .executive-table th{padding:7px 8px}
  .executive-page-full .executive-table td{padding:8px}
  .executive-page-full .technical-section-heading{padding:10px 13px}
  .executive-page-full .technical-proposal-grid{padding:13px 14px}
  .executive-page-full .technical-proposal-card{padding:7px 14px}
  .executive-page-full .technical-list{gap:5px}
  .executive-page-full .technical-list li{font-size:10.1px;line-height:1.46}
  .executive-page-with-1-products{gap:9px}
  .executive-page-with-1-products .executive-heading{padding:13px 14px 11px}
  .executive-page-with-1-products .executive-kpis{gap:8px;padding:11px 12px}
  .executive-page-with-1-products .executive-kpi{padding:9px 10px}
  .executive-page-with-1-products .executive-table-wrap{margin:0 12px 12px}
  .executive-page-with-1-products .executive-table th{padding:7px 8px}
  .executive-page-with-1-products .executive-table td{padding:7px 8px}
  .executive-page-with-1-products .technical-section-heading{padding:9px 13px}
  .executive-page-with-1-products .technical-proposal-grid{padding:11px 13px}
  .executive-page-with-1-products .technical-proposal-card{padding:7px 13px}
  .executive-page-with-1-products .technical-list{gap:4px}
  .executive-page-with-1-products .technical-list li{font-size:9.9px;line-height:1.42}
  .executive-page-with-1-products .scope-product-card>.scope-card-header{padding:10px 12px}
  .executive-page-with-1-products .scope-product-card>.scope-card-body{padding:13px 14px}
  .executive-page-with-1-products .scope-product-card .scope-item{padding:13px 0}
  .scope-card{border:1px solid #E2E8F0;border-radius:14px;background:#fff;overflow:hidden}
  .scope-card-header{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:8px 11px;border-bottom:1px solid #E2E8F0;background:#F8FAFC}
  .scope-card-header h2{font-size:14px;letter-spacing:-.02em;color:#0F172A}
  .scope-product-card>.scope-card-header{background:linear-gradient(90deg,#082F49 0%,#0F4C6B 100%);border-bottom-color:#0F4C6B}
  .scope-product-card>.scope-card-header .eyebrow{color:#BAE6FD}
  .scope-product-card>.scope-card-header h2{color:#fff}
  .scope-product-page-3 .scope-product-card{min-height:1010px;display:flex;flex-direction:column}
  .scope-product-page-3 .scope-product-card>.scope-card-body{flex:1;display:grid;grid-template-rows:repeat(3,minmax(0,1fr));padding:10px 14px 16px}
  .scope-product-page-3 .scope-item{align-content:start;padding:15px 0}
  .scope-product-page-2 .scope-product-card{min-height:1010px;display:flex;flex-direction:column}
  .scope-product-page-2 .scope-product-card>.scope-card-body{flex:1;display:grid;grid-template-rows:auto auto;align-content:center;gap:30px;padding:18px 14px}
  .scope-product-page-2 .scope-item{align-content:start;padding:22px 0}
  .status-pill{background:#E0F2FE;color:#075985;border:1px solid #BAE6FD;border-radius:999px;padding:5px 9px;font-size:10px;font-weight:800;white-space:nowrap}
  .scope-card-body{padding:8px 12px}
  .scope-item{display:grid;grid-template-columns:34px 1fr;gap:9px;padding:7px 0;border-bottom:1px solid #E2E8F0}
  .scope-item:last-child{border-bottom:0}
  .scope-item-index{font-family:"SF Mono","Roboto Mono","Fira Mono",monospace;font-size:10.5px;font-weight:850;color:#0F172A;background:#E0F2FE;border:1px solid #BAE6FD;border-radius:999px;width:30px;height:30px;display:flex;align-items:center;justify-content:center}
  .scope-item-title{font-size:13px;font-weight:800;color:#0F172A;line-height:1.28}
  .scope-item-meta{display:flex;flex-wrap:wrap;gap:5px;margin-top:5px}
  .scope-item-meta span{background:#F1F5F9;border:1px solid #E2E8F0;border-radius:999px;padding:3px 8px;font-size:9.8px;color:#475569;font-weight:700}
  .scope-product-title{font-size:11.2px;font-weight:800;color:#075985;margin-top:8px}
  .scope-summary{font-size:11px;line-height:1.48;color:#475569;margin-top:4px}
  .scope-bullets{display:grid;grid-template-columns:1fr;gap:3px;margin-top:6px;list-style:none}
  .scope-bullets li{position:relative;padding-left:13px;font-size:10.5px;line-height:1.45;color:#475569}
  .scope-bullets li:before{content:"";position:absolute;left:0;top:.55em;width:4px;height:4px;border-radius:999px;background:#38BDF8}
  .scope-business{margin-top:6px;background:#F8FAFC;border:1px solid #E2E8F0;border-radius:9px;padding:6px 8px;font-size:10.4px;line-height:1.4;color:#334155}
  .scope-item-note{font-size:9.8px;line-height:1.4;color:#64748B;margin-top:5px}
  .scope-empty{font-size:11px;color:#64748B;background:#F8FAFC;border:1px solid #E2E8F0;border-radius:12px;padding:12px}
  .support-list,.consideration-list{display:grid;grid-template-columns:1fr 1fr;gap:5px 12px;list-style:none}
  .support-list li,.consideration-list li{position:relative;padding-left:13px;font-size:10.5px;line-height:1.4;color:#475569}
  .support-list li:before,.consideration-list li:before{content:"";position:absolute;left:0;top:.55em;width:5px;height:5px;border-radius:999px;background:#1D4ED8}
  .scope-note{margin-top:8px;background:#FFFBEB;border:1px solid #FDE68A;border-radius:10px;padding:8px 10px;color:#92400E;font-size:10.5px;line-height:1.42}
  .scope-tail-heading{padding:12px 13px;border-left:4px solid #E31B2B;background:linear-gradient(90deg,#F8FAFC 0%,#fff 100%)}
  .scope-tail-heading h1{font-size:19px;line-height:1.2;letter-spacing:-.025em;color:#082F49}
  .scope-tail-heading p{font-size:10px;line-height:1.4;color:#64748B;margin-top:4px}
  .scope-split{display:grid;grid-template-columns:1.1fr .9fr;gap:9px}
  .scope-tail-page{gap:10px}
  .scope-tail-page .scope-tail-heading{padding:16px 15px}
  .scope-tail-page>.scope-card .scope-card-header{padding:10px 13px}
  .scope-tail-page>.scope-card .scope-card-body{padding:13px 15px}
  .scope-tail-page .support-list{gap:7px 16px}
  .scope-tail-page .support-list li{line-height:1.48}
  .scope-tail-page .scope-split{min-height:450px;gap:12px}
  .scope-tail-page .scope-split>.scope-card{display:flex;flex-direction:column}
  .scope-tail-page .scope-split>.scope-card>.scope-card-body{flex:1;display:flex;flex-direction:column;justify-content:center;padding:18px 17px}
  .scope-tail-page .consideration-list{gap:8px}
  .scope-tail-page .consideration-list li{line-height:1.48}
  .scope-tail-page .iso-logo-card{width:86px;height:86px}
  .certification-copy{font-size:10.5px;line-height:1.5;color:#475569}
  .iso-logos{display:flex;align-items:center;justify-content:center;gap:10px}
  .iso-logo-card{height:76px;width:76px;border:1px solid #E2E8F0;border-radius:14px;background:#fff;display:flex;align-items:center;justify-content:center;padding:6px}
  .iso-logo-card img{max-width:100%;max-height:100%;object-fit:contain}
  .footer{margin-top:auto;padding-top:8px;border-top:1px solid #E2E8F0;display:grid;grid-template-columns:1fr 1.25fr;gap:14px;color:#64748B;font-size:9.5px;line-height:1.45}
  .disclaimer{background:#F8FAFC;border:1px solid #E2E8F0;border-radius:10px;padding:7px 9px;color:#475569}
  @page{margin:12mm 10mm;size:A4}
</style>
</head>
<body>
  <div class="container pdf-content">
    ${technicalCoverPagesHTML}
    ${executiveAndProposalHTML}
    ${productScopePagesHTML}
    ${standaloneScopeTailHTML}
  </div>
</body>
</html>`;

  const fname = `Propuesta_Tecnica_Alcance_Servicio_VisionOne_Nextcom_${new Date().toISOString().split("T")[0]}.pdf`;

  return generatePdfFromHtml(html, fname).catch(err => {
    console.error("Error generando PDF de alcance:", err);
    alert("No se pudo generar el PDF de alcance. Por favor verifica tu conexión a internet e inténtalo de nuevo.\n\nDetalle: " + err.message);
    throw err;
  });
}

const TECHNICAL_SCOPE_FONTS = {
  inter400: inter400Url,
  inter500: inter500Url,
  inter600: inter600Url,
  inter700: inter700Url,
  plex400: plexMono400Url,
  plex500: plexMono500Url,
  plex600: plexMono600Url,
};

const SUPPORT_SLA_BY_POLICY = {
  Bronze: {
    hours: "5 x 8",
    firstContact: "Máximo 24 horas",
    criticalResponse: "Máximo 8 horas",
  },
  Silver: {
    hours: "5 x 8",
    firstContact: "Máximo 12 horas",
    criticalResponse: "Máximo 4 horas",
  },
  Gold: {
    hours: "5 x 8",
    firstContact: "Máximo 4 horas",
    criticalResponse: "Máximo 2 horas",
  },
  Platinum: {
    hours: "24 x 7",
    firstContact: "Máximo 2 horas",
    criticalResponse: "Máximo 30 minutos",
  },
};

function buildTechnicalScopeDocument(data) {
  const { lines, soporteSale, soporteCost, soporteDate, clientName, supportPolicy = "Platinum", technicalScope = {}, currency = "USD" } = data;
  const issueDate = new Date().toLocaleDateString("es-PA", { year:"numeric", month:"long", day:"numeric" });
  const shortDate = new Date().toLocaleDateString("es-PA", { year:"numeric", month:"2-digit", day:"2-digit" });
  const active = lines.filter(l => l.prodId && l.qty > 0).map(l => {
    const product = CATALOG.find(c => c.id === l.prodId);
    if (!product) return null;
    const months = monthsBetween(l.startDate, l.date);
    const prorated = Math.round(l.qty * product.credits * (months / 12));
    const productScope = getVisionOneProductScope({ ...l, prod:product, months, prorated });

    return {
      id: `${l.rowId}-${product.id}`,
      name: product.name,
      sku: product.sku || "",
      category: product.cat || "",
      quantity: `${l.qty.toLocaleString("en-US")} ${product.unit}${l.qty !== 1 ? "s" : ""}`,
      startDate: l.startDate || "Sin inicio",
      endDate: l.date || "Sin fin",
      credits: fmt(prorated),
      summary: productScope.summary,
      includes: productScope.includes,
      businessValue: productScope.businessValue,
      notes: productScope.notes,
      rawCredits: prorated,
    };
  }).filter(Boolean);

  const totalCredits = active.reduce((sum, line) => sum + line.rawCredits, 0);
  const selectedSupportPolicy = normalizeSupportPolicy(supportPolicy);
  const supportPolicyScope = getSupportPolicyScope(selectedSupportPolicy);
  const supportIncluded = soporteSale > 0 || soporteCost > 0;
  const selectedProductText = active.map(item => `${item.category} ${item.name}`.toLowerCase());
  const familyScopes = [
    { pattern:/endpoint|edr/, text:"Cobertura sobre capacidades de Endpoint Security incluidas en el dimensionamiento." },
    { pattern:/email|collaboration/, text:"Cobertura sobre capacidades de Email and Collaboration Security incluidas en el dimensionamiento." },
    { pattern:/zero trust|ztsa/, text:"Cobertura sobre capacidades de Zero Trust Secure Access incluidas en el dimensionamiento." },
    { pattern:/cloud risk management/, text:"Cobertura sobre capacidades de Cloud Risk Management incluidas en el dimensionamiento." },
    { pattern:/cyber risk exposure/, text:"Cobertura sobre capacidades de Cyber Risk Exposure Management incluidas en el dimensionamiento." },
    { pattern:/vision one credits|créditos vision one|credits/, text:"Uso del pool de Trend Vision One Credits conforme a los créditos dimensionados." },
  ].filter(family => selectedProductText.some(product => family.pattern.test(product))).map(family => family.text);

  const supportBullets = supportIncluded
    ? supportPolicyScope.bullets.filter(item => !item.includes("Plataforma de Solicitudes")).slice(0, 6)
    : [
        "La propuesta no incluye una póliza de soporte comercial asociada.",
        "Cualquier soporte adicional deberá validarse y cotizarse por separado.",
        "La cobertura operativa queda limitada a los productos incluidos en la propuesta.",
      ];

  return {
    clientName: clientName?.trim() || "",
    issueDate,
    shortDate,
    currency,
    totalCredits: fmt(totalCredits),
    contact: {
      name: technicalScope.contactName || "",
      role: technicalScope.contactRole || "",
      email: technicalScope.contactEmail || "",
      phone: technicalScope.contactPhone || "",
    },
    objectives: [
      "Fortalecer la postura de ciberseguridad del cliente mediante las capacidades incluidas en Trend Vision One / TrendAI.",
      "Centralizar visibilidad, prevención, detección y respuesta sobre los productos dimensionados.",
      "Reducir exposición operativa mediante monitoreo, priorización de riesgos y controles de seguridad según los módulos incluidos.",
      "Alinear el uso de créditos y servicios con el alcance técnico definido en la propuesta.",
    ],
    scopes: [
      "Implementación y/o habilitación de las capacidades asociadas a los productos incluidos.",
      "Uso de créditos Vision One según las cantidades dimensionadas.",
      "Cobertura técnica sobre los módulos seleccionados en la propuesta.",
      supportIncluded
        ? `Alcance de soporte según la póliza ${selectedSupportPolicy} seleccionada.`
        : "Soporte comercial Nextcom no incluido en la propuesta.",
      ...familyScopes,
    ],
    deliverables: [
      "Productos y capacidades habilitadas según el alcance aprobado.",
      "Documento de alcance técnico de productos, cantidades, vigencias y créditos.",
      supportIncluded
        ? `Soporte según la póliza ${selectedSupportPolicy} seleccionada.`
        : "Confirmación de que la propuesta no incluye una póliza de soporte Nextcom.",
      "Transferencia de información operativa necesaria para el uso del servicio.",
      "Validación de condiciones y consideraciones aplicables.",
    ],
    support: {
      included: supportIncluded,
      label: supportIncluded ? supportPolicyScope.label : "No incluido",
      sla: supportIncluded ? SUPPORT_SLA_BY_POLICY[selectedSupportPolicy] : {
        hours: "No incluido",
        firstContact: "No aplica",
        criticalResponse: "No aplica",
      },
      bullets: supportBullets,
      note: soporteDate ? `Vigencia referencial del soporte hasta ${soporteDate}.` : supportPolicyScope.note,
    },
    considerations: [
      "El alcance aplica únicamente sobre los productos, servicios y cantidades expresamente incluidos en la propuesta.",
      "La activación final de licencias, créditos o servicios queda sujeta a validación técnica, comercial y disponibilidad del fabricante cuando aplique.",
      "Actividades fuera del alcance, cambios realizados por terceros o servicios profesionales adicionales podrán cotizarse por separado.",
      "La atención presencial fuera del área metropolitana o condiciones especiales de traslado pueden requerir validación comercial adicional.",
      "Este documento es referencial y debe validarse contra la cotización final emitida por Nextcom.",
    ],
    items: active,
  };
}

async function printReactDocumentInIframe({ element, title }) {
  if (typeof window === "undefined") throw new Error("La impresión del PDF requiere un navegador");

  const iframe = document.createElement("iframe");
  iframe.setAttribute("aria-hidden", "true");
  iframe.style.cssText = [
    "position:fixed",
    "left:-10000px",
    "top:0",
    "width:816px",
    "height:1056px",
    "background:#ffffff",
    "border:0",
    "z-index:-1",
  ].join(";");
  document.body.appendChild(iframe);

  let root;
  let cleanupTimer;

  try {
    const frameWindow = iframe.contentWindow;
    const frameDocument = iframe.contentDocument || frameWindow.document;
    frameDocument.open();
    frameDocument.write(`<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8"><title>${title}</title></head><body><div id="technical-scope-print-root"></div></body></html>`);
    frameDocument.close();
    frameDocument.documentElement.style.backgroundColor = "#ffffff";
    frameDocument.body.style.backgroundColor = "#ffffff";

    const mountNode = frameDocument.getElementById("technical-scope-print-root");
    root = createRoot(mountNode);
    root.render(element);

    await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));

    const images = Array.from(frameDocument.images || []);
    if (images.length > 0) {
      await Promise.all(images.map(img => {
        if (img.complete && img.naturalWidth > 0) return Promise.resolve();
        return new Promise(resolve => {
          const done = () => resolve();
          img.addEventListener("load", done, { once:true });
          img.addEventListener("error", done, { once:true });
          setTimeout(done, 2500);
        });
      }));
    }

    if (frameDocument.fonts?.ready) {
      await frameDocument.fonts.ready;
    }

    const pages = Array.from(frameDocument.querySelectorAll(".page"));
    pages.forEach((page, index) => {
      if (page.scrollHeight > 1056) {
        console.warn(`[AlcanceTecnicoDocument] Página ${index + 1} excede 1056px:`, page.scrollHeight);
      }
    });

    await new Promise(resolve => requestAnimationFrame(resolve));

    const cleanup = () => {
      clearTimeout(cleanupTimer);
      if (root) root.unmount();
      if (iframe.parentNode) document.body.removeChild(iframe);
    };

    frameWindow.addEventListener("afterprint", cleanup, { once:true });
    cleanupTimer = setTimeout(cleanup, 60000);
    frameWindow.focus();
    frameWindow.print();
  } catch (error) {
    if (root) root.unmount();
    if (iframe.parentNode) document.body.removeChild(iframe);
    throw error;
  }
}

async function downloadClientScopeReport(data) {
  const documentData = buildTechnicalScopeDocument(data);
  const assets = {
    nextcomLogo: resolvePdfAssetUrl(NEXTCOM_LOGO),
    nextcomLogoReverse: resolvePdfAssetUrl(NEXTCOM_LOGO_REVERSE),
    trendAiLogo: resolvePdfAssetUrl(trendAiSidebarLogo),
    iso9001Logo: resolvePdfAssetUrl(iso9001Logo),
    iso27001Logo: resolvePdfAssetUrl(iso27001Logo),
    fonts: {
      inter400: resolvePdfAssetUrl(TECHNICAL_SCOPE_FONTS.inter400),
      inter500: resolvePdfAssetUrl(TECHNICAL_SCOPE_FONTS.inter500),
      inter600: resolvePdfAssetUrl(TECHNICAL_SCOPE_FONTS.inter600),
      inter700: resolvePdfAssetUrl(TECHNICAL_SCOPE_FONTS.inter700),
      plex400: resolvePdfAssetUrl(TECHNICAL_SCOPE_FONTS.plex400),
      plex500: resolvePdfAssetUrl(TECHNICAL_SCOPE_FONTS.plex500),
      plex600: resolvePdfAssetUrl(TECHNICAL_SCOPE_FONTS.plex600),
    },
  };
  const title = `Alcance_Tecnico_VisionOne_Nextcom_${new Date().toISOString().split("T")[0]}`;

  try {
    await printReactDocumentInIframe({
      title,
      element: <AlcanceTecnicoDocument document={documentData} assets={assets} />,
    });
  } catch (err) {
    console.error("Error generando PDF de alcance técnico:", err);
    alert("No se pudo abrir la impresión del alcance técnico. Inténtalo nuevamente.\n\nDetalle: " + err.message);
    throw err;
  }
}

function InternalApp() {
  const [lines, setLines] = useState(() => {
    const d = defaultDates();
    return [{ rowId: 1, prodId: null, qty: 0, date: d.date, startDate: d.startDate }];
  });
  const [rc, setRc] = useState(2);
  const [salePrice, setSalePrice] = useState(0);
  const [costPrice, setCostPrice] = useState(0);
  const [soporteSale, setSoporteSale] = useState(0);
  const [soporteCost, setSoporteCost] = useState(0);
  const [soporteDate, setSoporteDate] = useState("");
  const [supportPolicy, setSupportPolicy] = useState("Platinum");
  const [clientName, setClientName] = useState("");
  const [technicalScope, setTechnicalScope] = useState({
    contactName: "",
    contactRole: "",
    contactEmail: "",
    contactPhone: "",
  });
  const [pdfLoading, setPdfLoading] = useState(false);
  const [scopePdfLoading, setScopePdfLoading] = useState(false);
  const isMobile = useIsMobile();
  const supportPolicyGridColumns = isMobile
    ? "1fr"
    : (typeof window !== "undefined" && window.innerWidth < 1180 ? "repeat(2, minmax(0, 1fr))" : "repeat(4, minmax(0, 1fr))");
  const [settingsOpen, setSettingsOpen] = useState(false);

  // --- Currency / FX ---
  const [currency, setCurrency] = useState("USD"); // "USD" | "VES"
  const [rateSource, setRateSource] = useState("bcv"); // "bcv" | "binance" | "paralelo" | "manual"
  const [rates, setRates] = useState({ bcv: null, binance: null, paralelo: null, updatedAt: null });
  const [manualRate, setManualRate] = useState(40);
  const [fxLoading, setFxLoading] = useState(false);
  const [fxError, setFxError] = useState(null);

  const fetchRates = async () => {
    setFxLoading(true);
    setFxError(null);
    try {
      const r = await fetch("/api/rates");
      if (!r.ok) {
        const errData = await r.json().catch(() => ({}));
        throw new Error(errData.error || `HTTP ${r.status}`);
      }
      const d = await r.json();
      setRates({
        bcv: d.bcv,
        binance: d.binance,
        paralelo: d.paralelo,
        updatedAt: new Date()
      });
    } catch (e) {
      console.error("Rate fetch error:", e);
      setFxError(`No se pudieron obtener las tasas: ${e.message}. Usa 'Manual'.`);
    } finally {
      setFxLoading(false);
    }
  };

  useEffect(() => {
    if (currency === "VES" && !rates.updatedAt) fetchRates();
  }, [currency]);

  useEffect(() => {
    window.dispatchEvent(new CustomEvent("internal-currency-change", { detail: currency }));
  }, [currency]);

  useEffect(() => {
    const toggleCurrency = () => setCurrency(current => current === "USD" ? "VES" : "USD");
    window.addEventListener("internal-toggle-currency", toggleCurrency);
    return () => window.removeEventListener("internal-toggle-currency", toggleCurrency);
  }, []);

  // --- Import quote modal state ---
  const [importOpen, setImportOpen] = useState(false);
  const [importing, setImporting] = useState(false);
  const [importError, setImportError] = useState(null);
  const [importResult, setImportResult] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const openImport = () => setImportOpen(true);
    window.addEventListener("internal-open-import", openImport);
    return () => window.removeEventListener("internal-open-import", openImport);
  }, []);

  const handleFileImport = async (file) => {
    if (!file) return;
    setImporting(true);
    setImportError(null);
    setImportResult(null);
    try {
      // Read file as base64
      const base64 = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          const result = reader.result;
          const b64 = result.split(",")[1]; // strip "data:...;base64,"
          resolve(b64);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      const resp = await fetch("/api/parse-quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fileBase64: base64,
          mediaType: file.type || "application/octet-stream",
          fileName: file.name
        })
      });

      const data = await resp.json();
      if (!resp.ok) {
        throw new Error(data.error || `HTTP ${resp.status}`);
      }
      setImportResult(data);
    } catch (e) {
      console.error("Import error:", e);
      setImportError(e.message || "Error desconocido");
    } finally {
      setImporting(false);
    }
  };

  const applyImportResult = () => {
    if (!importResult) return;
    const newLines = importResult.lines
      .filter(l => l.prodId && l.quantity > 0) // only mappable lines with qty
      .map((l, i) => ({
        rowId: rc + i,
        prodId: l.prodId,
        qty: l.quantity,
        startDate: importResult.startDate || defaultDates().startDate,
        date: importResult.endDate || defaultDates().date
      }));
    if (newLines.length === 0) {
      setImportError("No se encontraron productos reconocidos en el archivo");
      return;
    }
    setRc(c => c + newLines.length);
    setLines(newLines);
    if (importResult.clientName) setClientName(importResult.clientName);
    if (importResult.soportePlatinum?.present) {
      setSoporteSale(importResult.soportePlatinum.price || 0);
      setSoporteDate(importResult.endDate || "");
      setSupportPolicy("Platinum");
    }
    setImportOpen(false);
    setImportResult(null);
  };

  const activeRate = rateSource === "manual" ? manualRate : (rates[rateSource] || 0);
  const vesRate = currency === "VES" ? activeRate : 1;
  const toView = usd => currency === "VES" ? usd * vesRate : usd;
  const viewSymbol = currency === "VES" ? "Bs." : "$";
  const fmtMoney = (usd, opts = {}) => {
    const val = toView(usd);
    const dec = opts.decimals ?? 2;
    return `${viewSymbol} ${val.toLocaleString("en-US", { minimumFractionDigits: dec, maximumFractionDigits: dec })}`;
  };

  let totalCredits = 0;
  lines.forEach(l => {
    if (l.prodId && l.qty > 0) {
      const p = CATALOG.find(c => c.id === l.prodId);
      if (p) {
        const months = monthsBetween(l.startDate, l.date);
        totalCredits += l.qty * p.credits * (months / 12);
      }
    }
  });
  totalCredits = Math.round(totalCredits);
  const creditRevenue = totalCredits * salePrice;
  const creditCost    = totalCredits * costPrice;
  const totalRevenue  = creditRevenue + soporteSale;
  const totalCost     = creditCost + soporteCost;
  const totalMargin   = totalRevenue - totalCost;
  const marginPct     = totalRevenue > 0 ? (totalMargin / totalRevenue) * 100 : 0;
  const activeLines   = lines.filter(l => l.prodId && l.qty > 0).length;
  const perCrPct      = salePrice > 0 ? (salePrice - costPrice) / salePrice * 100 : 0;
  const supportIncluded = soporteSale > 0 || soporteCost > 0;
  const mColor = pct => pct >= 20 ? C.green : pct > 0 ? C.amber : C.red;
  const mBg    = pct => pct >= 20 ? C.greenBg : pct > 0 ? C.amberBg : "#FEF2F2";

  const addLine = () => {
    const d = defaultDates();
    setLines(p => [...p, { rowId:rc, prodId:null, qty:0, date:d.date, startDate:d.startDate }]);
    setRc(c => c+1);
  };
  const updateLine = (row) => setLines(p => p.map(l => l.rowId===row.rowId ? row : l));
  const deleteLine = (id) => setLines(p => {
    if (p.length > 1) return p.filter(l => l.rowId!==id);
    const d = defaultDates();
    return [{ rowId:rc, prodId:null, qty:0, date:d.date, startDate:d.startDate }];
  });
  const duplicateLine = (id) => {
    setLines(p => {
      const idx = p.findIndex(l => l.rowId===id);
      const d = defaultDates();
      const next = [...p];
      next.splice(idx+1, 0, { rowId:rc, prodId:p[idx].prodId, qty:0, date:d.date, startDate:d.startDate });
      return next;
    });
    setRc(c => c+1);
  };
  const clearAll = () => { if(confirm("¿Limpiar todo? Esto incluye los precios configurados.")){ const d = defaultDates(); setLines([{ rowId:rc, prodId:null, qty:0, date:d.date, startDate:d.startDate }]); setRc(c => c+1); setSalePrice(0); setCostPrice(0); setSoporteSale(0); setSoporteCost(0); setSoporteDate(""); setSupportPolicy("Platinum"); setClientName(""); setTechnicalScope({ contactName:"", contactRole:"", contactEmail:"", contactPhone:"" }); }};

  return (
    <>
      <style>{PRINT_CSS}</style>

      <PrintView data={{ lines, totalCredits, totalRevenue, totalCost, totalMargin, marginPct, salePrice, costPrice, soporteSale, soporteCost, soporteDate, supportPolicy, clientName }} />

      <InternalCalculatorShell
        isMobile={isMobile}
        sidebar={!isMobile ? (
          <InternalPricingPanel
            logoSrc={TRENDAI_LOGO}
            salePrice={salePrice}
            costPrice={costPrice}
            onSalePriceChange={setSalePrice}
            onCostPriceChange={setCostPrice}
            perCreditLabel={`${fmtU(salePrice-costPrice)} · ${perCrPct.toFixed(1)}%`}
            perCreditColor={mColor(perCrPct)}
            perCreditBg={mBg(perCrPct)}
            summaryItems={[
              { label:"Créditos totales", value:fmt(totalCredits), color:C.blue },
              { label:"Ingresos (cliente)", value:fmtMoney(totalRevenue), color:C.text },
              { label:"Costo (proveedor)", value:fmtU(totalCost) + " USD", color:C.text2 },
              { label:"Margen bruto", value:fmtU(totalMargin) + " USD", color:mColor(marginPct) },
              { label:"Rentabilidad", value:`${marginPct.toFixed(1)}%`, color:mColor(marginPct) },
            ]}
            onExportPdf={async () => {
              if (pdfLoading) return;
              setPdfLoading(true);
              try { await downloadReport({ lines, totalCredits, totalRevenue, totalCost, totalMargin, marginPct, salePrice, costPrice, soporteSale, soporteCost, soporteDate, supportPolicy, clientName, currency, rateSource, activeRate, vesRate }); }
              catch(e){} finally { setPdfLoading(false); }
            }}
            onExportScopePdf={async () => {
              if (scopePdfLoading) return;
              setScopePdfLoading(true);
              try { await downloadClientScopeReport({ lines, soporteSale, soporteCost, soporteDate, supportPolicy, clientName, currency, technicalScope }); }
              catch(e){} finally { setScopePdfLoading(false); }
            }}
            pdfLoading={pdfLoading}
            scopePdfLoading={scopePdfLoading}
          />
        ) : null}
      >

      {/* Mobile top header with logo + currency toggle + settings */}
      {isMobile && (
      <header style={{ background:C.surface, borderBottom:`1px solid ${C.border}`, padding:"10px 14px", display:"flex", alignItems:"center", justifyContent:"space-between", position:"sticky", top:0, zIndex:100, gap:10 }}>
        <img src={TRENDAI_LOGO} alt="TrendAI" style={{ height:28, width:"auto" }} />
        <div style={{ display:"flex", alignItems:"center", gap:6 }}>
          <div style={{ display:"flex", background:C.panel, border:`1px solid ${C.border}`, borderRadius:6, padding:2 }}>
            {[
              { code:"USD", label:"🇵🇦" },
              { code:"VES", label:"🇻🇪" },
            ].map(c => (
              <button key={c.code} onClick={() => setCurrency(c.code)}
                style={{ padding:"5px 9px", fontSize:13, background:currency===c.code?C.surface:"transparent", border:"none", borderRadius:4, cursor:"pointer", boxShadow: currency===c.code ? "0 1px 2px rgba(0,0,0,.08)" : "none" }}>
                {c.label}
              </button>
            ))}
          </div>
          <button onClick={() => setSettingsOpen(true)}
            style={{ width:38, height:38, borderRadius:8, border:`1px solid ${C.border}`, background:C.surface, cursor:"pointer", fontSize:16, display:"flex", alignItems:"center", justifyContent:"center" }}>
            ⚙
          </button>
        </div>
      </header>
      )}

      <main style={{ padding: isMobile ? "14px 14px 20px" : 0, overflowY:isMobile?"auto":"visible", background:"transparent" }}>

        {/* Warning banner if prices are 0 */}
        {(salePrice === 0 || costPrice === 0) && (
          <div style={{
            background:"#FFFBEB",
            border:`1px solid #FBBF24`,
            borderRadius:8,
            padding: isMobile ? "12px 14px" : "14px 16px",
            marginBottom: isMobile ? 14 : 26,
            display:"flex",
            alignItems:"center",
            gap:12
          }}>
            <div style={{ width:28, height:28, borderRadius:8, background:"#FBBF24", color:"#92400E", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
              <AlertTriangle size={17} strokeWidth={2.4} />
            </div>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:isMobile?13:14, fontWeight:700, color:C.amber, marginBottom:2 }}>
                Precios en cero — recuerda configurarlos antes de cotizar
              </div>
              <div style={{ fontSize:isMobile?11:12, color:C.text2, lineHeight:1.4 }}>
                {isMobile
                  ? "Toca el botón ⚙ arriba para ingresar los precios."
                  : "Por seguridad, los precios al cliente y costo proveedor inician en $0.00. Ingrésalos en el panel izquierdo."}
              </div>
            </div>
            {isMobile && (
              <button onClick={() => setSettingsOpen(true)}
                style={{ padding:"8px 12px", background:C.amber, color:"#fff", border:"none", borderRadius:7, fontSize:12, fontWeight:700, cursor:"pointer", whiteSpace:"nowrap" }}>
                ⚙ Ajustes
              </button>
            )}
          </div>
        )}

        <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:isMobile?12:22, gap:18, flexWrap:"wrap" }}>
          <div>
            <div style={{ fontSize:isMobile?18:22, fontWeight:750, letterSpacing:"-.025em", marginBottom:7, color:"#0F172A" }}>Nueva cotización</div>
            {!isMobile && <div style={{ fontSize:13, color:"#64748B" }}>Busca productos del catálogo y construye la propuesta línea por línea</div>}
          </div>
          {!isMobile && (
          <div style={{ display:"flex", gap:10, alignItems:"center", flexWrap:"wrap" }}>
            {/* Currency toggle */}
            <div style={{ display:"none", background:"#fff", border:"1px solid #E2E8F0", borderRadius:9, padding:3, boxShadow:"0 1px 2px rgba(15,23,42,.04)" }}>
              {[
                { code:"USD", label:"🇵🇦 USD", sub:"Panamá" },
                { code:"VES", label:"🇻🇪 Bs.", sub:"Venezuela" },
              ].map(c => (
                <button key={c.code} onClick={() => setCurrency(c.code)}
                  style={{ padding:"7px 12px", fontSize:12, fontWeight:currency===c.code?700:500, background:currency===c.code?"#F1F5F9":"transparent", color:currency===c.code?"#0F172A":"#64748B", border:"none", borderRadius:6, cursor:"pointer" }}>
                  {c.label}
                </button>
              ))}
            </div>
            <input type="text" placeholder="Nombre del cliente (opcional)" value={clientName} onChange={e=>setClientName(e.target.value)}
              style={{ fontSize:13, padding:"8px 11px", border:"1px solid #E2E8F0", borderRadius:8, background:"#fff", color:"#0F172A", width:220, outline:"none", boxShadow:"0 1px 2px rgba(15,23,42,.04)" }} />
            <button onClick={clearAll} style={{ fontSize:13, color:"#475569", background:"#fff", border:"1px solid #E2E8F0", borderRadius:8, padding:"8px 12px", cursor:"pointer", fontWeight:600, boxShadow:"0 1px 2px rgba(15,23,42,.04)" }}>Limpiar</button>
          </div>
          )}
        </div>

        {/* Mobile: client name input */}
        {isMobile && (
          <div style={{ marginBottom:10, display:"flex", flexDirection:"column", gap:8 }}>
            <button onClick={() => setImportOpen(true)}
              style={{ fontSize:14, color:"#fff", background:C.blue, border:"none", borderRadius:9, padding:"12px", cursor:"pointer", fontWeight:600, display:"flex", alignItems:"center", justifyContent:"center", gap:6 }}>
              ✨ Importar cotización con IA
            </button>
            <input type="text" placeholder="Nombre del cliente (opcional)" value={clientName} onChange={e=>setClientName(e.target.value)}
              style={{ fontSize:15, padding:"11px 13px", border:`1px solid ${C.border}`, borderRadius:8, background:C.surface, color:C.text, width:"100%", outline:"none", boxSizing:"border-box" }} />
          </div>
        )}

        <section aria-label="Contacto del cliente" style={{ marginBottom:isMobile?14:18, padding:isMobile?"2px 0 0":"0 2px" }}>
          <div style={{ display:"flex", alignItems:isMobile?"flex-start":"baseline", gap:isMobile?3:8, flexDirection:isMobile?"column":"row", marginBottom:8 }}>
            <div style={{ fontSize:12, fontWeight:700, color:"#334155" }}>Contacto del cliente</div>
            <div style={{ fontSize:11, color:"#94A3B8" }}>Opcional para la portada del alcance técnico.</div>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:supportPolicyGridColumns, gap:8 }}>
            {[
              { key:"contactName", label:"Contacto principal", placeholder:"Nombre y apellido", type:"text" },
              { key:"contactRole", label:"Cargo", placeholder:"Cargo o área", type:"text" },
              { key:"contactEmail", label:"Correo", placeholder:"correo@empresa.com", type:"email" },
              { key:"contactPhone", label:"Teléfono", placeholder:"+507 0000-0000", type:"tel" },
            ].map(field => (
              <label key={field.key} style={{ display:"flex", flexDirection:"column", gap:5 }}>
                <span style={{ fontSize:10.5, fontWeight:600, color:"#64748B" }}>{field.label}</span>
                <input
                  type={field.type}
                  value={technicalScope[field.key]}
                  onChange={e => setTechnicalScope(current => ({ ...current, [field.key]:e.target.value }))}
                  placeholder={field.placeholder}
                  style={{ height:36, boxSizing:"border-box", fontSize:12.5, color:"#0F172A", border:"1px solid #E2E8F0", borderRadius:7, padding:"0 10px", outline:"none", background:"#fff", boxShadow:"0 1px 2px rgba(15,23,42,.03)" }}
                />
              </label>
            ))}
          </div>
        </section>

        {/* FX panel — only when VES */}
        {currency === "VES" && (
          <div style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:10, padding: isMobile?"12px":"14px 16px", marginBottom:16, boxShadow:"0 1px 2px rgba(0,0,0,.02)" }}>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:10, flexWrap:"wrap", gap:8 }}>
              <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                <span style={{ fontSize:13, fontWeight:600 }}>Tasa USD → VES</span>
                {rates.updatedAt && <span style={{ fontSize:10, color:C.text3 }}>{rates.updatedAt.toLocaleTimeString("es-PA", { hour:"2-digit", minute:"2-digit" })}</span>}
              </div>
              <button onClick={fetchRates} disabled={fxLoading}
                style={{ fontSize:11, color:C.text2, background:C.panel, border:`1px solid ${C.border}`, borderRadius:5, padding:"4px 10px", cursor:"pointer", display:"flex", alignItems:"center", gap:5 }}>
                {fxLoading ? "⟳ Actualizando..." : "↻ Actualizar tasas"}
              </button>
            </div>
            <div style={{ display:"grid", gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)", gap:8 }}>
              {[
                { key:"bcv", label:"BCV", sub:"Oficial", value:rates.bcv },
                { key:"binance", label:"Binance P2P", sub:"Cripto", value:rates.binance },
                { key:"paralelo", label:"Paralelo", sub:"Monitor", value:rates.paralelo },
                { key:"manual", label:"Manual", sub:"Ingresar", value:manualRate },
              ].map(t => {
                const sel = rateSource === t.key;
                return (
                  <button key={t.key} onClick={() => setRateSource(t.key)}
                    style={{ textAlign:"left", padding:"10px 12px", background:sel?C.blueBg:C.surface, border:`1.5px solid ${sel?C.blue:C.border}`, borderRadius:7, cursor:"pointer" }}>
                    <div style={{ fontSize:10, fontWeight:700, color:sel?C.blue:C.text3, textTransform:"uppercase", letterSpacing:".06em", marginBottom:3 }}>{t.label}</div>
                    {t.key === "manual" ? (
                      <input type="number" value={manualRate} step={0.01} min={0}
                        onClick={e => { e.stopPropagation(); setRateSource("manual"); }}
                        onChange={e => setManualRate(parseFloat(e.target.value) || 0)}
                        style={{ ...mono, width:"100%", fontSize:15, fontWeight:700, color:sel?C.blue:C.text, background:"transparent", border:"none", outline:"none", padding:0 }} />
                    ) : (
                      <div style={{ ...mono, fontSize:15, fontWeight:700, color:sel?C.blue:(t.value?C.text:C.text3) }}>
                        {t.value ? `Bs. ${t.value.toLocaleString("en-US", { minimumFractionDigits:2, maximumFractionDigits:2 })}` : "—"}
                      </div>
                    )}
                    <div style={{ fontSize:10, color:C.text3, marginTop:2 }}>{t.sub}</div>
                  </button>
                );
              })}
            </div>
            {fxError && <div style={{ fontSize:11, color:C.red, marginTop:8 }}>⚠ {fxError}</div>}
          </div>
        )}

        <InternalKpiStrip
          metrics={[
            { label:"Créditos totales", value:fmt(totalCredits), color:C.blue, icon:Package },
            { label:`Ingresos${currency==="VES"?" (Bs.)":""}`, value:fmtMoney(totalRevenue), color:C.text, sub: currency==="VES" ? `$${totalRevenue.toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2})} USD` : null, icon:TrendingUp },
            { label:"Margen bruto", value:fmtMoney(totalMargin), color:mColor(marginPct), sub:`${marginPct.toFixed(1)}% rentabilidad`, icon:BarChart3 },
            { label:"Líneas activas", value:activeLines, color:C.text, sub:`de ${lines.length} total`, icon:FileText },
          ]}
        />

        <div style={{ height:isMobile?14:16 }} />

        <InternalWorkspaceSection
          title="Productos de la cotización"
          description="Área central para construir la propuesta línea por línea."
          action={!isMobile && <div style={{ display:"flex", gap:18, fontSize:12, color:"#64748B" }}><span>Duplicar</span><span>Eliminar</span></div>}
        >
        <div style={{ background: isMobile?"transparent":"#fff", overflow:"hidden" }}>
          {!isMobile && (
          <>
          <div style={{ display:"grid", gridTemplateColumns:"36px minmax(300px,1fr) 132px 132px 88px 96px 60px", gap:12, padding:"11px 20px", background:"#F8FAFC", borderBottom:"1px solid #E2E8F0" }}>
            {["#","Producto","Inicio","Vencimiento","Cant.","Créditos",""].map((h,i) => (
              <div key={i} style={{ fontSize:10, fontWeight:800, color:"#64748B", textAlign:i>=4&&i<6?"right":i===0?"center":"left", textTransform:"uppercase", letterSpacing:".06em" }}>{h}</div>
            ))}
          </div>
          </>
          )}

          {isMobile && (
            <div style={{ fontSize:11, fontWeight:700, color:C.text3, textTransform:"uppercase", letterSpacing:".06em", marginBottom:8 }}>
              Productos ({lines.length})
            </div>
          )}

          {lines.map((line, idx) => (
            <LineRow key={line.rowId} line={line} idx={idx} onUpdate={updateLine} onDelete={deleteLine} onDuplicate={duplicateLine} isMobile={isMobile} />
          ))}

          <button onClick={addLine} style={{
            display:"flex", alignItems:"center", justifyContent:"center", gap:6,
            padding: isMobile?"14px":"14px", background: isMobile?C.blueBg:"#fff", border: isMobile?`1.5px dashed ${C.blue}`:"1px dashed #CBD5E1",
            borderRadius: isMobile?10:8, margin: isMobile?"4px 0 0":"14px 20px 18px", width:isMobile?"100%":"calc(100% - 40px)",
            cursor:"pointer", color:C.blue, fontSize: isMobile?14:12, fontWeight:600
          }}>
            <span style={{ fontSize: isMobile?18:14 }}>＋</span> Agregar producto
          </button>
        </div>
        </InternalWorkspaceSection>

        <div style={{ height:14 }} />

        <InternalWorkspaceSection
          title="Póliza de soporte"
          description="Precio libre · línea especial sin créditos. Selecciona el nivel de SLA aplicable."
        >
        <div style={{ background:"#fff", overflow:"hidden" }}>
          <div style={{ padding:isMobile?"14px":"22px 20px", background:supportIncluded?"#F8FBFF":"#fff" }}>
            <div style={{ display:"grid", gridTemplateColumns: supportPolicyGridColumns, gap:18, alignItems:"end" }}>
            <div>
              <div style={{ fontSize:12, color:"#64748B", marginBottom:8, fontWeight:500 }}>Tipo de póliza</div>
              <select
                value={supportPolicy}
                disabled={!supportIncluded}
                onChange={e => setSupportPolicy(normalizeSupportPolicy(e.target.value))}
                style={{
                  fontSize:13,
                  fontWeight:700,
                  color:supportIncluded ? "#0F172A" : "#94A3B8",
                  border:"1px solid #E2E8F0",
                  borderRadius:7,
                  padding:"0 10px",
                  background:supportIncluded ? "#fff" : "#F8FAFC",
                  height:38,
                  width:"100%",
                  boxSizing:"border-box",
                  boxShadow:"0 1px 2px rgba(15,23,42,.03)",
                  cursor:supportIncluded ? "pointer" : "not-allowed",
                }}
              >
                {SUPPORT_POLICY_OPTIONS.map(policy => (
                  <option key={policy} value={policy}>{policy}</option>
                ))}
              </select>
            </div>
            {[
              { l:"Precio al cliente", v:soporteSale, set:setSoporteSale },
              { l:"Costo proveedor",   v:soporteCost, set:setSoporteCost },
            ].map(f => (
              <div key={f.l}>
                <div style={{ fontSize:12, color:"#64748B", marginBottom:8, fontWeight:500 }}>{f.l}</div>
                <div style={{ display:"flex", alignItems:"center", gap:4, border:"1px solid #E2E8F0", borderRadius:7, padding:"0 11px", height:38, boxSizing:"border-box", background:"#fff", boxShadow:"0 1px 2px rgba(15,23,42,.03)" }}>
                  <span style={{ color:"#64748B", fontSize:13 }}>$</span>
                  <input type="number" min={0} step={0.01} value={f.v||""} placeholder="0.00" onChange={e => f.set(parseFloat(e.target.value)||0)}
                    style={{ ...mono, fontSize:13, fontWeight:600, width:"100%", border:"none", outline:"none", background:"transparent", color:"#0F172A" }} />
                </div>
              </div>
            ))}
            <div>
              <div style={{ fontSize:12, color:"#64748B", marginBottom:8, fontWeight:500 }}>Vencimiento</div>
              <input type="date" value={soporteDate} onChange={e => setSoporteDate(e.target.value)}
                style={{ ...mono, fontSize:12, color:"#0F172A", border:"1px solid #E2E8F0", borderRadius:7, padding:"0 11px", height:38, boxSizing:"border-box", background:"#fff", width:"100%", boxShadow:"0 1px 2px rgba(15,23,42,.03)" }} />
            </div>
            </div>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", gap:12, marginTop:10, flexWrap:"wrap" }}>
              <div style={{ fontSize:10.5, color:"#94A3B8" }}>
                El nivel de póliza seleccionado se reflejará en el alcance del PDF interno.
              </div>
              <div style={{ display:"flex", alignItems:"center", gap:8, fontSize:11, color:"#64748B" }}>
                <span>Margen</span>
                <span style={{ ...mono, fontSize:13, fontWeight:700, color:soporteSale>soporteCost?C.green:"#64748B" }}>
                  {soporteSale > 0 ? fmtU(soporteSale - soporteCost) : "—"}
                </span>
              </div>
            </div>
          </div>
        </div>
        </InternalWorkspaceSection>

        <p style={{ fontSize:11, color:C.text3, marginTop:12, textAlign:"center" }}>Créditos calculados para 12 meses · Trend Micro Vision One Jan 2026</p>
      </main>

      {/* Mobile: fixed bottom bar with totals + PDF button */}
      {isMobile && (
        <div style={{
          position:"fixed", bottom:0, left:0, right:0,
          background:C.surface, borderTop:`1px solid ${C.border}`,
          padding: "10px 14px calc(10px + env(safe-area-inset-bottom, 0px))",
          display:"flex", alignItems:"center", justifyContent:"space-between", gap:10,
          boxShadow:"0 -2px 10px rgba(0,0,0,.04)", zIndex:90
        }}>
          <div style={{ flex:1, minWidth:0 }}>
            <div style={{ fontSize:10, color:C.text3, marginBottom:1 }}>{fmt(totalCredits)} créditos · {activeLines} líneas</div>
            <div style={{ ...mono, fontSize:16, fontWeight:700, color:C.text, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>
              {fmtMoney(totalRevenue)}
            </div>
            <div style={{ fontSize:10, color:mColor(marginPct), fontWeight:600 }}>
              Margen {fmtU(totalMargin)} · {marginPct.toFixed(1)}%
            </div>
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:6, minWidth:138 }}>
            <button onClick={async () => {
                if (pdfLoading) return;
                setPdfLoading(true);
                try { await downloadReport({ lines, totalCredits, totalRevenue, totalCost, totalMargin, marginPct, salePrice, costPrice, soporteSale, soporteCost, soporteDate, supportPolicy, clientName, currency, rateSource, activeRate, vesRate }); }
                catch(e){} finally { setPdfLoading(false); }
              }} disabled={pdfLoading}
              title="Incluye créditos, precios, costos, margen, rentabilidad, P&L y observaciones internas. Uso interno Nextcom."
              style={{ padding:"9px 12px", background: pdfLoading ? "#A8A29E" : C.text, color:"#fff", border:"none", borderRadius:9, fontSize:12, fontWeight:700, cursor: pdfLoading ? "wait" : "pointer", whiteSpace:"nowrap", display:"flex", alignItems:"center", justifyContent:"center", gap:6, opacity: pdfLoading ? 0.7 : 1 }}>
              {pdfLoading ? "Generando..." : "Análisis interno"}
            </button>
            <button
              type="button"
              title="Incluye productos, cantidades, vigencias, créditos, alcance por producto, soporte, condiciones y certificaciones. No incluye costos, margen ni rentabilidad."
              onClick={async () => {
                if (scopePdfLoading) return;
                setScopePdfLoading(true);
                try { await downloadClientScopeReport({ lines, soporteSale, soporteCost, soporteDate, supportPolicy, clientName, currency, technicalScope }); }
                catch(e){} finally { setScopePdfLoading(false); }
              }}
              disabled={scopePdfLoading}
              style={{ padding:"8px 12px", background:"#F8FAFC", color:"#334155", border:"1px solid #E2E8F0", borderRadius:9, fontSize:12, fontWeight:700, cursor:scopePdfLoading?"wait":"pointer", whiteSpace:"nowrap", textAlign:"center", opacity:scopePdfLoading ? .7 : 1 }}
            >
              {scopePdfLoading ? "Generando..." : "Alcance para cliente"}
            </button>
          </div>
        </div>
      )}

      {/* Mobile: settings drawer */}
      {isMobile && settingsOpen && (
        <div style={{ position:"fixed", inset:0, zIndex:9998, background:"rgba(0,0,0,0.5)" }} onClick={() => setSettingsOpen(false)}>
          <div onClick={e => e.stopPropagation()} style={{
            position:"absolute", bottom:0, left:0, right:0,
            background:C.surface, borderRadius:"16px 16px 0 0",
            maxHeight:"85vh", overflowY:"auto",
            padding: "16px 16px calc(16px + env(safe-area-inset-bottom, 0px))",
            boxShadow:"0 -8px 30px rgba(0,0,0,0.2)"
          }}>
            <div style={{ width:40, height:4, background:C.border, borderRadius:2, margin:"0 auto 14px" }} />
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:14 }}>
              <div style={{ fontSize:17, fontWeight:700 }}>Ajustes</div>
              <button onClick={() => setSettingsOpen(false)} style={{ width:32, height:32, borderRadius:8, border:`1px solid ${C.border}`, background:C.surface, fontSize:14, cursor:"pointer" }}>✕</button>
            </div>

            <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
              <div>
                <div style={{ fontSize:10, fontWeight:700, color:C.text3, textTransform:"uppercase", letterSpacing:".08em", marginBottom:8 }}>Precios por crédito</div>
                {[
                  { label:"Precio al cliente", sub:"Lo que cobra Nextcom", val:salePrice, set:setSalePrice, accent:true },
                  { label:"Costo proveedor",   sub:"Lo que paga Nextcom",  val:costPrice, set:setCostPrice, accent:false },
                ].map(f => (
                  <div key={f.label} style={{ marginBottom:10 }}>
                    <div style={{ fontSize:11, color:C.text3, marginBottom:4, fontWeight:600 }}>{f.label}</div>
                    <div style={{ display:"flex", alignItems:"center", gap:6, background:C.bg, borderRadius:8, padding:"10px 14px", border:`1px solid ${C.border}` }}>
                      <span style={{ fontSize:14, color:C.text3 }}>$</span>
                      <input type="number" inputMode="decimal" value={f.val} step={0.005} min={0} onChange={e => f.set(parseFloat(e.target.value)||0)}
                        style={{ ...mono, width:"100%", fontSize:17, fontWeight:600, color:f.accent?C.blue:C.text, background:"none", border:"none", outline:"none" }} />
                    </div>
                  </div>
                ))}
                <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", background:mBg(perCrPct), borderRadius:7, padding:"8px 12px", marginTop:4 }}>
                  <span style={{ fontSize:12, color:C.text2 }}>Margen / crédito</span>
                  <span style={{ ...mono, fontSize:13, fontWeight:700, color:mColor(perCrPct) }}>{fmtU(salePrice-costPrice)} · {perCrPct.toFixed(1)}%</span>
                </div>
              </div>

              <div>
                <div style={{ fontSize:10, fontWeight:700, color:C.text3, textTransform:"uppercase", letterSpacing:".08em", marginBottom:8 }}>Resumen del negocio</div>
                <div style={{ background:C.bg, border:`1px solid ${C.border}`, borderRadius:8, padding:"4px 12px" }}>
                  {[
                    { l:"Créditos totales",   v:fmt(totalCredits), c:C.blue },
                    { l:"Ingresos (cliente)", v:fmtMoney(totalRevenue), c:C.text },
                    { l:"Costo (proveedor)",  v:fmtU(totalCost) + " USD", c:C.text2 },
                    { l:"Margen bruto",       v:fmtU(totalMargin) + " USD", c:mColor(marginPct) },
                    { l:"Rentabilidad",       v:`${marginPct.toFixed(1)}%`, c:mColor(marginPct) },
                  ].map(m => (
                    <div key={m.l} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"8px 0", borderBottom:`1px solid ${C.border}` }}>
                      <span style={{ fontSize:12, color:C.text2 }}>{m.l}</span>
                      <span style={{ ...mono, fontSize:13, fontWeight:600, color:m.c }}>{m.v}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button onClick={() => { clearAll(); setSettingsOpen(false); }} style={{
                fontSize:13, color:C.red, background:C.surface, border:`1px solid ${C.border}`, borderRadius:8, padding:"12px", cursor:"pointer", fontWeight:600
              }}>
                Limpiar cotización
              </button>

              <div style={{ fontSize:10, color:C.text3, lineHeight:1.5, textAlign:"center" }}>
                Nextcom Systems, Inc. · Trend Micro Platinum Partner · Panamá
              </div>
            </div>
          </div>
        </div>
      )}

      {/* IMPORT QUOTE MODAL */}
      {importOpen && (
        <div style={{ position:"fixed", inset:0, zIndex:10000, background:"rgba(15, 23, 42, 0.58)", backdropFilter:"blur(10px)", display:"flex", alignItems:"center", justifyContent:"center", padding: isMobile?0:24 }}
          onClick={() => { if (!importing) { setImportOpen(false); setImportResult(null); setImportError(null); } }}>
          <div onClick={e => e.stopPropagation()} style={{
            background: C.surface, borderRadius: isMobile?"22px 22px 0 0":24,
            width: isMobile?"100%":"100%", maxWidth: isMobile?"none":740,
            maxHeight: isMobile?"92vh":"86vh", overflow:"auto",
            position: isMobile?"fixed":"relative", bottom: isMobile?0:"auto", left:0, right:0,
            border:`1px solid ${C.border}`,
            boxShadow:"0 28px 90px rgba(15, 23, 42, 0.28)"
          }}>
            {isMobile && <div style={{ width:42, height:4, background:C.border, borderRadius:999, margin:"12px auto 0" }} />}
            <div style={{ padding:isMobile?"18px 18px 16px":"24px 28px 20px", borderBottom:`1px solid ${C.border}`, display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:16 }}>
              <div style={{ display:"flex", gap:14, alignItems:"flex-start", minWidth:0 }}>
                <div style={{
                  width:44, height:44, borderRadius:14, background:"#F1F7FF",
                  border:`1px solid ${C.border}`, display:"flex", alignItems:"center", justifyContent:"center",
                  color:C.blue, flex:"0 0 auto"
                }}>
                  <FileText size={21} strokeWidth={2.2} />
                </div>
                <div style={{ minWidth:0 }}>
                  <div style={{ fontSize:20, fontWeight:750, letterSpacing:"-.025em", color:C.text }}>Importar cotización</div>
                  <div style={{ fontSize:13, color:C.text2, marginTop:5, lineHeight:1.45, maxWidth:520 }}>
                    Carga una propuesta o archivo de referencia para detectar productos y créditos.
                  </div>
                </div>
              </div>
              {!importing && (
                <button onClick={() => { setImportOpen(false); setImportResult(null); setImportError(null); }}
                  aria-label="Cerrar importación"
                  style={{ width:36, height:36, borderRadius:999, border:`1px solid ${C.border}`, background:C.panel, color:C.text2, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", flex:"0 0 auto" }}>
                  <X size={16} />
                </button>
              )}
            </div>

            <div style={{ padding:isMobile?"18px":"24px 28px 28px" }}>
              {!importResult && !importing && (
                <>
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    onDragOver={e => { e.preventDefault(); e.currentTarget.style.borderColor = C.blue; e.currentTarget.style.background = C.blueBg; }}
                    onDragLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.background = "#F8FAFC"; }}
                    onDrop={e => {
                      e.preventDefault();
                      e.currentTarget.style.borderColor = C.border;
                      e.currentTarget.style.background = "#F8FAFC";
                      const file = e.dataTransfer.files[0];
                      if (file) handleFileImport(file);
                    }}
                    style={{
                      border:`1.5px dashed ${C.border}`, borderRadius:18, padding:isMobile?"28px 18px":"34px 28px",
                      textAlign:"center", cursor:"pointer", background:"#F8FAFC",
                      transition:"all 0.15s ease", position:"relative", overflow:"hidden"
                    }}>
                    <div style={{
                      width:58, height:58, borderRadius:18, margin:"0 auto 16px",
                      background:C.surface, border:`1px solid ${C.border}`, boxShadow:"0 12px 24px rgba(15, 23, 42, 0.06)",
                      display:"flex", alignItems:"center", justifyContent:"center", color:C.blue
                    }}>
                      <Upload size={24} strokeWidth={2.2} />
                    </div>
                    <div style={{ fontSize:15, fontWeight:700, color:C.text, marginBottom:6, letterSpacing:"-.01em" }}>
                      Arrastra el archivo aquí o selecciónalo desde tu equipo.
                    </div>
                    <div style={{ fontSize:12, color:C.text2, lineHeight:1.5, maxWidth:420, margin:"0 auto 18px" }}>
                      Soporta propuestas, reportes o documentos comerciales compatibles.
                    </div>
                    <button type="button" style={{
                      border:"none", borderRadius:10, background:C.blue, color:"#fff", padding:"10px 16px",
                      fontSize:13, fontWeight:700, cursor:"pointer", boxShadow:"0 10px 22px rgba(37, 99, 235, 0.22)"
                    }}>
                      Seleccionar archivo
                    </button>
                    <div style={{ fontSize:11, color:C.text3, marginTop:14 }}>
                      PDF, JPG, PNG, DOCX, XLSX, TXT o CSV
                    </div>
                  </div>
                  <input ref={fileInputRef} type="file" accept=".pdf,.jpg,.jpeg,.png,.webp,.docx,.xlsx,.xls,.txt,.csv,application/pdf,image/*"
                    style={{ display:"none" }}
                    onChange={e => e.target.files[0] && handleFileImport(e.target.files[0])} />

                  {importError && (
                    <div style={{ marginTop:16, padding:"13px 14px", background:"#FEF2F2", border:`1px solid #FECACA`, borderRadius:12, fontSize:12, color:C.red, display:"flex", gap:10, alignItems:"flex-start", lineHeight:1.45 }}>
                      <AlertTriangle size={16} style={{ flex:"0 0 auto", marginTop:1 }} />
                      <div>
                        <div style={{ fontWeight:700, marginBottom:2 }}>No pudimos importar el archivo</div>
                        <div>{importError}</div>
                      </div>
                    </div>
                  )}

                  <div style={{ marginTop:16, padding:"13px 14px", background:C.panel, border:`1px solid ${C.border}`, borderRadius:12, fontSize:12, color:C.text2, lineHeight:1.5, display:"flex", gap:10, alignItems:"flex-start" }}>
                    <Info size={15} style={{ flex:"0 0 auto", color:C.blue, marginTop:2 }} />
                    <div>
                      <strong style={{ color:C.text }}>Revisión asistida por IA.</strong> La extracción puede reconocer SKUs, nombres de productos y vigencias, pero debe revisarse antes de aplicarla.
                    </div>
                  </div>
                </>
              )}

              {importing && (
                <div style={{ textAlign:"center", padding:isMobile?"44px 20px":"56px 36px" }}>
                  <div style={{
                    width:64, height:64, borderRadius:22, margin:"0 auto 18px",
                    background:"#F1F7FF", border:`1px solid ${C.border}`,
                    display:"flex", alignItems:"center", justifyContent:"center", color:C.blue,
                    boxShadow:"0 14px 30px rgba(15, 23, 42, 0.08)"
                  }}>
                    <Sparkles size={26} strokeWidth={2.1} />
                  </div>
                  <div style={{ fontSize:17, fontWeight:750, color:C.text, marginBottom:6, letterSpacing:"-.015em" }}>Analizando cotización...</div>
                  <div style={{ fontSize:13, color:C.text2, lineHeight:1.55, maxWidth:430, margin:"0 auto" }}>
                    Estamos detectando productos, créditos, fechas y condiciones comerciales. Esto puede tardar unos segundos.
                  </div>
                </div>
              )}

              {importResult && !importing && (
                <div>
                  <div style={{ padding:"14px 16px", background: importResult.confidence === "high" ? C.greenBg : importResult.confidence === "medium" ? C.amberBg : "#FEF2F2", border:`1px solid ${importResult.confidence === "high" ? "#BBF7D0" : importResult.confidence === "medium" ? "#FDE68A" : "#FECACA"}`, borderRadius:14, marginBottom:16, display:"flex", gap:12, alignItems:"flex-start" }}>
                    <Shield size={18} style={{ color: importResult.confidence === "high" ? C.green : importResult.confidence === "medium" ? C.amber : C.red, flex:"0 0 auto", marginTop:1 }} />
                    <div>
                      <div style={{ fontSize:13, fontWeight:750, color: importResult.confidence === "high" ? C.green : importResult.confidence === "medium" ? C.amber : C.red, marginBottom:3 }}>
                        {importResult.confidence === "high" ? "Extracción exitosa" : importResult.confidence === "medium" ? "Revisa los resultados" : "Confianza baja - verifica manualmente"}
                      </div>
                      {importResult.notes && <div style={{ fontSize:12, color:C.text2, lineHeight:1.45 }}>{importResult.notes}</div>}
                    </div>
                  </div>

                  <div style={{ display:"grid", gridTemplateColumns:isMobile?"1fr":"1.1fr .9fr", gap:12, marginBottom:16 }}>
                    <div style={{ border:`1px solid ${C.border}`, borderRadius:14, background:C.surface, padding:14 }}>
                      <div style={{ fontSize:10, fontWeight:800, color:C.text3, textTransform:"uppercase", letterSpacing:".08em", marginBottom:8 }}>Cliente detectado</div>
                      <div style={{ fontSize:14, fontWeight:750, color:C.text, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>
                        {importResult.clientName || "Pendiente de revisión"}
                      </div>
                      <div style={{ marginTop:7, display:"flex", gap:8, flexWrap:"wrap", alignItems:"center" }}>
                        {importResult.quoteNumber && <span style={{ fontSize:11, color:C.text2, background:C.panel, border:`1px solid ${C.border}`, borderRadius:999, padding:"3px 8px" }}>Cot. #{importResult.quoteNumber}</span>}
                        {importResult.isRenewal && <span style={{ fontSize:11, background:C.blueBg, color:C.blue, padding:"3px 8px", borderRadius:999, fontWeight:800 }}>Renovación</span>}
                      </div>
                    </div>
                    <div style={{ border:`1px solid ${C.border}`, borderRadius:14, background:C.surface, padding:14 }}>
                      <div style={{ fontSize:10, fontWeight:800, color:C.text3, textTransform:"uppercase", letterSpacing:".08em", marginBottom:8 }}>Vigencia</div>
                      <div style={{ fontSize:13, color:C.text2, display:"flex", alignItems:"center", gap:8, flexWrap:"wrap" }}>
                        <span style={{ ...mono, color:C.text }}>{importResult.startDate || "Sin inicio"}</span>
                        <ChevronRight size={14} color={C.text3} />
                        <span style={{ ...mono, color:C.text }}>{importResult.endDate || "Sin vencimiento"}</span>
                      </div>
                    </div>
                  </div>

                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", gap:12, marginBottom:8 }}>
                    <div style={{ fontSize:11, fontWeight:800, color:C.text3, textTransform:"uppercase", letterSpacing:".08em" }}>
                      {importResult.lines.length} líneas detectadas
                    </div>
                    <div style={{ fontSize:11, color:C.text3 }}>Solo se aplican productos reconocidos</div>
                  </div>
                  <div style={{ border:`1px solid ${C.border}`, borderRadius:14, overflow:"hidden", marginBottom:16, maxHeight:280, overflowY:"auto", background:C.surface }}>
                    {importResult.lines.map((l, i) => (
                      <div key={i} style={{ padding:"12px 14px", borderBottom: i < importResult.lines.length - 1 ? `1px solid ${C.border}` : "none", display:"grid", gridTemplateColumns:"minmax(0, 1fr) auto", gap:12, alignItems:"center", background: l.prodId ? C.surface : "#F8FAFC" }}>
                        <div style={{ flex:1, minWidth:0 }}>
                          <div style={{ fontSize:13, fontWeight:650, color: l.prodId ? C.text : C.text3, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>
                            {l.productName}
                          </div>
                          <div style={{ fontSize:11, color:C.text3, marginTop:4, display:"flex", gap:7, alignItems:"center", flexWrap:"wrap" }}>
                            {l.sku && <span>{l.sku} · </span>}
                            {l.prodId ? (
                              <span style={{ color:C.green, fontWeight:700 }}>Reconocido</span>
                            ) : (
                              <span style={{ color:C.red, fontWeight:700 }}>No mapeado - se omitirá</span>
                            )}
                          </div>
                        </div>
                        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                          <div style={{ fontSize:10, fontWeight:800, color:C.text3, textTransform:"uppercase", letterSpacing:".06em" }}>Cant.</div>
                          <div style={{ ...mono, minWidth:42, textAlign:"center", fontSize:13, fontWeight:800, color:C.blue, whiteSpace:"nowrap", background:C.blueBg, borderRadius:999, padding:"5px 8px" }}>
                            {l.quantity}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {importResult.soportePlatinum?.present && (
                    <div style={{ fontSize:12, color:C.text2, marginBottom:16, padding:"12px 14px", background:C.panel, border:`1px solid ${C.border}`, borderRadius:12, display:"flex", justifyContent:"space-between", alignItems:"center", gap:12 }}>
                      <span style={{ fontWeight:700, color:C.text }}>Póliza de soporte detectada</span>
                      <strong style={{ ...mono, color:C.text }}>${importResult.soportePlatinum.price?.toLocaleString() || 0}</strong>
                    </div>
                  )}

                  <div style={{ display:"flex", gap:10, flexDirection:isMobile?"column":"row" }}>
                    <button onClick={() => { setImportResult(null); }}
                      style={{ flex:1, padding:"12px 14px", background:C.surface, border:`1px solid ${C.border}`, borderRadius:10, cursor:"pointer", fontSize:13, fontWeight:700, color:C.text2 }}>
                      Probar otro archivo
                    </button>
                    <button onClick={applyImportResult}
                      style={{ flex:2, padding:"12px 14px", background:C.blue, color:"#fff", border:"none", borderRadius:10, cursor:"pointer", fontSize:13, fontWeight:800, display:"flex", alignItems:"center", justifyContent:"center", gap:8, boxShadow:"0 12px 24px rgba(37, 99, 235, 0.22)" }}>
                      Aplicar a cotización
                      <ChevronRight size={15} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </InternalCalculatorShell>

    {/* ═══ ADVISOR — Asistente de IA Vision One (modo interno Nextcom) ═══ */}
    <Advisor
      mode="internal"
      isMobile={isMobile}
      getContext={() => ({
        clientName,
        products: lines.filter(l => l.prodId && l.qty > 0).map(l => {
          const p = CATALOG.find(c => c.id === l.prodId);
          return p ? {
            name: p.name,
            qty: l.qty,
            unit: p.unit,
            creditsPerUnit: p.credits,
            totalCredits: Math.round(l.qty * (p.credits || 0)),
            origin: l.origin || "manual",
          } : null;
        }).filter(Boolean),
        totalCredits,
        commercials: {
          salePrice,
          costPrice,
          totalRevenue,
          totalCost,
          totalMargin,
          marginPct,
          currency,
        },
      })}
    />
    </>
  );
}



// ════════════════════════════════════════════════════════════════════════
// CLIENT APP — Versión simplificada para clientes (sin precios)
// ════════════════════════════════════════════════════════════════════════

const NEXTCOM_LOGO = nextcomLogo;
const NEXTCOM_LOGO_REVERSE = nextcomLogoReverse;

const DESC = {
  "AK": "Pool de créditos prepagados que se consumen según los productos activados",
  "A": "Identifica y prioriza riesgos de seguridad en dispositivos y red",
  "B": "Análisis avanzado de exposición al riesgo en dispositivos",
  "C": "Análisis avanzado de exposición al riesgo en infraestructura de red",
  "D": "Análisis de riesgo en cuentas cloud con menos de 500 recursos",
  "E": "Análisis de riesgo en cuentas cloud con 501-1000 recursos",
  "F": "Análisis de riesgo en cuentas cloud con 1001-1500 recursos",
  "G": "Análisis de riesgo en cuentas cloud con 1501-2000 recursos",
  "H": "Análisis de riesgo en cuentas cloud con 2001-2500 recursos",
  "I": "Análisis de riesgo en cuentas cloud con 2501-3000 recursos",
  "J": "Análisis de riesgo en cuentas cloud con 3001-3500 recursos",
  "K": "Análisis de riesgo en cuentas cloud con 3501+ recursos",
  "L": "Ingesta de logs en SIEM para análisis avanzado",
  "M": "Ingesta de logs en SIEM para archivado",
  "N": "Retención de datos analíticos en SIEM",
  "O": "Retención de datos archivados en SIEM",
  "P": "Almacenamiento de paquetes forenses para investigaciones",
  "Q": "Exportación de datos a sistemas externos",
  "R": "Detección y respuesta avanzada en endpoints (EDR)",
  "S": "Detección y respuesta avanzada en correo electrónico",
  "T": "Detección y respuesta en redes con Deep Discovery Inspector",
  "U": "Detección y respuesta en redes basada en bandwidth",
  "V": "Detección y respuesta en infraestructura cloud",
  "X": "Análisis manual de archivos sospechosos en sandbox",
  "Y": "Análisis automático de URLs sospechosas vía ZTSA Internet",
  "Z": "Análisis automático de tráfico de red en sandbox",
  "a": "Análisis automático de archivos desde endpoints en sandbox",
  "b": "Inteligencia de amenazas para tu organización",
  "c": "Inteligencia de amenazas para proveedores de servicios (MSSP)",
  "d": "Protección de nodos Kubernetes y contenedores ECS",
  "e": "Protección de pods y tasks serverless",
  "f": "Detección personalizada en contenedores",
  "g": "Escaneo de archivos vía Virtual Appliance",
  "i": "Scanner dedicado de Virtual Appliance (5TB)",
  "j": "Escaneo de archivos containerizado",
  "l": "Scanner containerizado dedicado (5TB)",
  "m": "Integración SDK para escaneo de archivos en aplicaciones propias",
  "o": "Escaneo de archivos en almacenamiento cloud",
  "q": "Bucket reservado para File Security Storage",
  "r": "Protección antivirus y EDR para equipos y servidores",
  "s": "Endpoint Security con XDR incluido",
  "t": "Endpoint Security empresarial con XDR + funciones avanzadas",
  "u": "Escaneo de servidores SAP con NetWeaver",
  "v": "Protección antivirus para dispositivos móviles (iOS/Android)",
  "x": "Filtro antispam, antiphishing y protección de correo (Microsoft 365 / Google)",
  "y": "Email Security con XDR incluido",
  "z": "Email Security empresarial con XDR + DLP + funciones avanzadas",
  "AA": "Acceso seguro Zero Trust para internet y aplicaciones internas",
  "AB": "Acceso seguro Zero Trust para navegación web",
  "AC": "Acceso seguro Zero Trust para aplicaciones internas (reemplaza VPN)",
  "AD": "Acceso seguro Zero Trust para servicios de IA generativa (ChatGPT, etc.)",
  "AE": "Acceso seguro Zero Trust para internet + servicios de IA",
  "AF": "IPs estáticas dedicadas para tráfico saliente de ZTSA",
  "AG": "Prevención de pérdida de datos (DLP) en endpoints",
  "AH": "Seguridad para aplicaciones de IA en infraestructura privada",
  "AI": "Seguridad para aplicaciones de IA en SaaS",
  "AJ": "Paquete completo de seguridad para IA empresarial",
};


function LineCard({ line, onUpdate, onDelete, idx, isMobile }) {
  const [picking, setPicking] = useState(false);
  const triggerRef = useRef(null);
  const prod = line.prodId ? CATALOG.find(p => p.id === line.prodId) : null;
  const desc = prod ? DESC[prod.id] : null;

  const months = monthsBetween(line.startDate, line.date);
  const proratedTotal = prod ? Math.round(line.qty * prod.credits * (months / 12)) : 0;
  const isProrated = prod && line.qty > 0 && Math.abs(months - 12) > 0.1;
  const active = line.qty > 0 && prod;

  const qtyLabel = prod ? (
    prod.unit.includes("usuario") ? "¿Cuántos usuarios?" :
    prod.unit.includes("endpoint") ? "¿Cuántos endpoints?" :
    prod.unit.includes("dispositivo móvil") ? "¿Cuántos móviles?" :
    prod.unit.includes("dispositivo") ? "¿Cuántos dispositivos?" :
    prod.unit.includes("cuenta cloud") ? "¿Cuántas cuentas cloud?" :
    prod.unit.includes("crédito") ? "¿Cuántos créditos?" :
    prod.unit.includes("nodo") ? "¿Cuántos nodos?" :
    prod.unit.includes("pod") ? "¿Cuántos pods?" :
    prod.unit.includes("scanner") ? "¿Cuántos scanners?" :
    prod.unit.includes("bucket") ? "¿Cuántos buckets?" :
    prod.unit.includes("tenant") ? "¿Cuántos tenants?" :
    prod.unit.includes("submission") ? "¿Cuántas submissions?" :
    prod.unit.includes("servidor") ? "¿Cuántos servidores?" :
    prod.unit.includes("instancia") ? "¿Cuántas instancias?" :
    prod.unit.includes("empleado") ? "¿Cuántos empleados?" :
    prod.unit.includes("GB") ? "¿Cuántos GB?" :
    prod.unit.includes("TB") ? "¿Cuántos TB?" :
    prod.unit.includes("Mbps") ? "¿Cuántos bloques?" :
    "Cantidad"
  ) : "Cantidad";

  return (
    <div style={{
      background: active ? "#FAFCFF" : C.surface,
      border: `1px solid ${active ? "#C7D9EF" : C.border}`,
      borderRadius: 12,
      padding: isMobile ? 14 : 18,
      marginBottom: 10,
      boxShadow: active ? "0 2px 6px rgba(30,64,175,.08)" : "0 1px 2px rgba(0,0,0,.02)"
    }}>
      <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:12, marginBottom: prod ? 14 : 0 }}>
        <div ref={triggerRef} style={{ position:"relative", flex:1 }}>
          <button onClick={() => setPicking(!picking)}
            style={{ width:"100%", textAlign:"left", background:"none", border:`1px solid ${prod ? "transparent" : C.border}`, borderRadius:8, padding:"8px 12px", cursor:"pointer", minHeight:44 }}>
            {prod ? (
              <div>
                <div style={{ fontSize:isMobile?15:16, fontWeight:600, color:C.text, lineHeight:1.3, display:"flex", alignItems:"center", gap:8, flexWrap:"wrap" }}>
                  <span>{CAT_ICONS[prod.cat] || "•"}  {prod.name}</span>
                  {line.origin === "from_usage" && (
                    <span style={{ fontSize:10, padding:"2px 7px", background:"#EFF6FF", color:"#1E40AF", borderRadius:4, fontWeight:600, letterSpacing:".02em", textTransform:"uppercase", whiteSpace:"nowrap" }}>
                      del consumo
                    </span>
                  )}
                  {line.origin === "from_proposal" && (
                    <span style={{ fontSize:10, padding:"2px 7px", background:"#FFFBEB", color:"#92400E", borderRadius:4, fontWeight:600, letterSpacing:".02em", textTransform:"uppercase", whiteSpace:"nowrap" }}>
                      del contrato
                    </span>
                  )}
                  {(line.origin === "edited_usage" || line.origin === "edited_proposal") && (
                    <span style={{ fontSize:10, padding:"2px 7px", background:"#FEF3C7", color:"#854D0E", borderRadius:4, fontWeight:600, letterSpacing:".02em", textTransform:"uppercase", whiteSpace:"nowrap" }}>
                      editado
                    </span>
                  )}
                </div>
                {desc && <div style={{ fontSize:12, color:C.text2, marginTop:4, lineHeight:1.4 }}>{desc}</div>}
                {line.origin === "from_usage" && line.originMeta && (
                  <div style={{ fontSize:11, color:C.text3, marginTop:4, lineHeight:1.4 }}>
                    Detectado: {fmt(line.originMeta.monthlyCr)} cr/mes ({fmt(line.originMeta.annualCr)} cr/año){line.originMeta.monthLabel ? ` · ${line.originMeta.monthLabel}` : ""}
                  </div>
                )}
                {line.origin === "edited_usage" && line.originMeta && (
                  <div style={{ fontSize:11, color:C.text3, marginTop:4, lineHeight:1.4 }}>
                    Original: {fmt(line.originMeta.monthlyCr)} cr/mes (estimado del consumo)
                  </div>
                )}
                {line.origin === "from_proposal" && line.originMeta && (
                  <div style={{ fontSize:11, color:C.text3, marginTop:4, lineHeight:1.4 }}>
                    Del contrato {line.originMeta.sourceFile ? `· ${line.originMeta.sourceFile}` : ""}
                  </div>
                )}
              </div>
            ) : (
              <div style={{ color:C.text3, fontSize:14, display:"flex", alignItems:"center", gap:6 }}>
                <span style={{ fontSize:16 }}>⊕</span> Selecciona un producto...
              </div>
            )}
          </button>
          {picking && <ProductPicker triggerRef={triggerRef} isMobile={isMobile} onPick={p => onUpdate({ ...line, prodId:p.id })} onClose={() => setPicking(false)} />}
        </div>
        <button onClick={() => onDelete(line.rowId)} title="Eliminar"
          style={{ width:32, height:32, borderRadius:7, border:`1px solid ${C.border}`, background:C.surface, cursor:"pointer", fontSize:13, color:C.red, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>✕</button>
      </div>

      {prod && (
        <>
          <div style={{ display:"grid", gridTemplateColumns:isMobile?"1fr":"1fr 1fr 1fr", gap:10, marginBottom: active ? 14 : 0 }}>
            <div>
              <div style={{ fontSize:11, fontWeight:600, color:C.text3, marginBottom:5, textTransform:"uppercase", letterSpacing:".05em" }}>{qtyLabel}</div>
              <input type="number" inputMode="numeric" min={0} step={1} value={line.qty||""} placeholder="0"
                onChange={e => onUpdate({...line, qty:parseInt(e.target.value)||0})}
                style={{ ...mono, fontSize:18, fontWeight:600, textAlign:"center", padding:"12px", border:`1.5px solid ${active?C.blue:C.border}`, borderRadius:8, background:active?"#fff":C.surface, color:C.text, outline:"none", width:"100%", boxSizing:"border-box" }} />
              <div style={{ fontSize:10, color:C.text3, marginTop:4, textAlign:"center" }}>{prod.unit}</div>
            </div>
            <div>
              <div style={{ fontSize:11, fontWeight:600, color:C.text3, marginBottom:5, textTransform:"uppercase", letterSpacing:".05em" }}>Inicio</div>
              <input type="date" value={line.startDate || ""} onChange={e=>onUpdate({...line, startDate:e.target.value})}
                style={{ ...mono, fontSize:13, color:C.text2, border:`1px solid ${C.border}`, borderRadius:8, padding:"12px 10px", background:C.surface, width:"100%", boxSizing:"border-box" }} />
            </div>
            <div>
              <div style={{ fontSize:11, fontWeight:600, color:C.text3, marginBottom:5, textTransform:"uppercase", letterSpacing:".05em" }}>Vencimiento</div>
              <input type="date" value={line.date} onChange={e=>onUpdate({...line, date:e.target.value})}
                style={{ ...mono, fontSize:13, color:C.text2, border:`1px solid ${isProrated?C.amber:C.border}`, borderRadius:8, padding:"12px 10px", background:C.surface, width:"100%", boxSizing:"border-box" }} />
            </div>
          </div>

          {isProrated && active && (
            <div style={{ padding:"8px 12px", background:C.amberBg, border:`1px solid #FDE68A`, borderRadius:7, fontSize:11, color:C.amber, marginBottom:10, display:"flex", alignItems:"center", gap:6 }}>
              <span>⚠</span> Vigencia de {months} meses (prorrateado)
            </div>
          )}

          {active && (
            <div style={{ padding:"14px 16px", backgroundColor:C.blue, background:`linear-gradient(135deg, ${C.blue} 0%, ${C.blueDark} 100%)`, borderRadius:9, display:"flex", justifyContent:"space-between", alignItems:"center", boxShadow:"0 2px 8px rgba(30,64,175,.2)" }}>
              <div>
                <div style={{ fontSize:12, color:"#FFFFFF", fontWeight:600 }}>Esta línea consume</div>
                <div style={{ fontSize:10, color:"#DBEAFE", marginTop:2, fontWeight:500 }}>{fmt(prod.credits)} cr × {line.qty} × {(months/12).toFixed(2)} año(s)</div>
              </div>
              <div style={{ textAlign:"right" }}>
                <div style={{ ...mono, fontSize:24, fontWeight:800, color:"#FFFFFF", lineHeight:1 }}>{fmt(proratedTotal)}</div>
                <div style={{ fontSize:10, color:"#DBEAFE", fontWeight:600, textTransform:"uppercase", letterSpacing:".06em", marginTop:3 }}>créditos</div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

function downloadEstimate(data) {
  const {
    lines, totalCredits, clientName, contactName, contactEmail, contactPhone,
    usageItems = [], usageMonth = "", usageMonthlyTotal = 0, usageAnnualTotal = 0,
    proposalItems = [], proposalEffectiveTotal = 0, proposalTotalPool = 0,
    proposalDate = "", proposalPeriod = "",
    hasComparative = false, efficiency = 0, surplus = 0, deficit = 0, recommendedAnnual = 0
  } = data;
  const today = new Date().toLocaleDateString("es-PA", { year:"numeric", month:"long", day:"numeric" });
  const active = lines.filter(l => l.prodId && l.qty > 0).map(l => {
    const p = CATALOG.find(c => c.id===l.prodId);
    if (!p) return null; // defensive: si no se encuentra el producto, omitirlo
    const months = monthsBetween(l.startDate, l.date);
    const prorated = Math.round(l.qty * (p.credits || 0) * (months / 12));
    return { ...l, prod:p, months, prorated, isProrated: Math.abs(months - 12) > 0.1 };
  }).filter(Boolean);

  const hasUsage = usageItems.length > 0 && usageAnnualTotal > 0;
  const hasProposal = proposalEffectiveTotal > 0;
  const hasNewQuote = active.length > 0;

  // Compute audit if we have both
  const audit = hasComparative
    ? auditUsageVsProposal(proposalItems, usageItems, proposalEffectiveTotal)
    : null;

  // Helper to render usage section
  const usageSection = !hasUsage ? "" : `
  <div style="margin-bottom:24px;page-break-inside:avoid">
    <div style="font-size:11px;font-weight:700;color:#57534E;text-transform:uppercase;letter-spacing:.08em;margin-bottom:8px;display:flex;align-items:center;gap:8px">
      <span style="background:#1E40AF;color:#fff;padding:3px 8px;border-radius:4px;font-size:10px">📊 Sección 1</span>
      <span>Consumo actual de Vision One${usageMonth ? ` · ${usageMonth}` : ""}</span>
    </div>
    <table style="width:100%;border-collapse:collapse;border:1px solid #E7E5E4;font-size:11px">
      <thead><tr style="background:#F5F5F4">
        <th style="padding:8px 10px;text-align:left;font-size:10px;font-weight:700;color:#57534E;text-transform:uppercase;letter-spacing:.05em">Producto</th>
        <th style="padding:8px 10px;text-align:right;font-size:10px;font-weight:700;color:#57534E;text-transform:uppercase;letter-spacing:.05em">Mensual</th>
        <th style="padding:8px 10px;text-align:right;font-size:10px;font-weight:700;color:#57534E;text-transform:uppercase;letter-spacing:.05em">Anual ×12</th>
        <th style="padding:8px 10px;text-align:right;font-size:10px;font-weight:700;color:#57534E;text-transform:uppercase;letter-spacing:.05em">≈ Licencias</th>
      </tr></thead>
      <tbody>
        ${usageItems.map(it => {
          const prod = it.prodId ? CATALOG.find(c => c.id === it.prodId) : null;
          const annual = (Number(it.monthly) || 0) * 12;
          const licenses = prod && prod.credits > 0 ? Math.round(annual / prod.credits) : null;
          return `<tr>
            <td style="padding:8px 10px;border-bottom:1px solid #E7E5E4;font-size:11px">${prod ? prod.name : (it.nameInScreenshot || "—")}</td>
            <td style="padding:8px 10px;border-bottom:1px solid #E7E5E4;text-align:right;font-family:'SF Mono',monospace;font-size:11px">${fmt(it.monthly)}</td>
            <td style="padding:8px 10px;border-bottom:1px solid #E7E5E4;text-align:right;font-family:'SF Mono',monospace;font-size:11px;font-weight:700">${fmt(annual)}</td>
            <td style="padding:8px 10px;border-bottom:1px solid #E7E5E4;text-align:right;font-family:'SF Mono',monospace;font-size:11px;color:#1E40AF;font-weight:700">${licenses !== null ? `≈ ${fmt(licenses)} ${prod.unit}${licenses !== 1 ? "s" : ""}` : "—"}</td>
          </tr>`;
        }).join("")}
      </tbody>
      <tfoot>
        <tr style="background:#EFF6FF">
          <td style="padding:10px;font-size:11px;font-weight:700;color:#1E40AF">Total consumo proyectado anual</td>
          <td style="padding:10px;text-align:right;font-family:'SF Mono',monospace;font-size:12px;font-weight:700;color:#1E40AF">${fmt(usageMonthlyTotal)}</td>
          <td style="padding:10px;text-align:right;font-family:'SF Mono',monospace;font-size:14px;font-weight:800;color:#1E40AF">${fmt(usageAnnualTotal)}</td>
          <td style="padding:10px;font-size:10px;color:#1E40AF">cr/año</td>
        </tr>
      </tfoot>
    </table>
  </div>`;

  // Helper to render proposal section
  const proposalSection = !hasProposal ? "" : `
  <div style="margin-bottom:24px;page-break-inside:avoid">
    <div style="font-size:11px;font-weight:700;color:#57534E;text-transform:uppercase;letter-spacing:.08em;margin-bottom:8px;display:flex;align-items:center;gap:8px">
      <span style="background:#B45309;color:#fff;padding:3px 8px;border-radius:4px;font-size:10px">📄 Sección ${hasUsage ? "2" : "1"}</span>
      <span>Propuesta anterior${proposalPeriod ? ` · ${proposalPeriod}` : ""}${proposalDate ? ` · ${proposalDate}` : ""}</span>
    </div>
    <div style="background:#FFFBEB;border:1px solid #FDE68A;border-radius:8px;padding:14px;margin-bottom:10px">
      <div style="display:flex;justify-content:space-between;align-items:center">
        <div style="font-size:11px;color:#78350F;font-weight:600;text-transform:uppercase;letter-spacing:.05em">Pool total comprado</div>
        <div style="font-family:'SF Mono',monospace;font-size:22px;font-weight:800;color:#B45309">${fmt(proposalEffectiveTotal)} cr</div>
      </div>
    </div>
    ${proposalItems.length > 0 || proposalTotalPool > 0 ? `
    <table style="width:100%;border-collapse:collapse;border:1px solid #E7E5E4;font-size:11px">
      <thead><tr style="background:#F5F5F4">
        <th style="padding:8px 10px;text-align:left;font-size:10px;font-weight:700;color:#57534E;text-transform:uppercase;letter-spacing:.05em">Producto</th>
        <th style="padding:8px 10px;text-align:right;font-size:10px;font-weight:700;color:#57534E;text-transform:uppercase;letter-spacing:.05em">Comprado</th>
        <th style="padding:8px 10px;text-align:right;font-size:10px;font-weight:700;color:#57534E;text-transform:uppercase;letter-spacing:.05em">Créditos</th>
      </tr></thead>
      <tbody>
        ${proposalItems.map(it => {
          const prod = it.prodId ? CATALOG.find(c => c.id === it.prodId) : null;
          const unit = prod ? prod.unit : "";
          return `<tr>
            <td style="padding:8px 10px;border-bottom:1px solid #E7E5E4;font-size:11px">${prod ? prod.name : (it.nameInProposal || "—")}</td>
            <td style="padding:8px 10px;border-bottom:1px solid #E7E5E4;text-align:right;font-family:'SF Mono',monospace;font-size:11px">${fmt(it.qty)} ${unit}${it.qty !== 1 ? "s" : ""}</td>
            <td style="padding:8px 10px;border-bottom:1px solid #E7E5E4;text-align:right;font-family:'SF Mono',monospace;font-size:11px;color:#B45309;font-weight:700">${fmt(it.totalCredits)}</td>
          </tr>`;
        }).join("")}
        ${proposalTotalPool > 0 ? `
        <tr style="background:#FFFBEB">
          <td style="padding:10px;border-bottom:1px solid #FDE68A;font-size:11px;font-weight:700">
            🪙 Vision One Credits — Pool de créditos sueltos
            <div style="font-size:9px;color:#78350F;font-weight:500;margin-top:2px">SKU VONN0000 / VORN0232 / VORN0309 (créditos flexibles)</div>
          </td>
          <td style="padding:10px;border-bottom:1px solid #FDE68A;text-align:right;font-family:'SF Mono',monospace;font-size:11px;color:#78350F">— créditos</td>
          <td style="padding:10px;border-bottom:1px solid #FDE68A;text-align:right;font-family:'SF Mono',monospace;font-size:12px;color:#B45309;font-weight:800">${fmt(proposalTotalPool)}</td>
        </tr>` : ""}
      </tbody>
      <tfoot>
        <tr style="background:#FEF3C7;border-top:2px solid #B45309">
          <td colspan="2" style="padding:11px;font-size:12px;font-weight:800;color:#78350F;text-transform:uppercase;letter-spacing:.04em">Total propuesta anterior</td>
          <td style="padding:11px;text-align:right;font-family:'SF Mono',monospace;font-size:15px;font-weight:800;color:#92400E">${fmt(proposalEffectiveTotal)}</td>
        </tr>
      </tfoot>
    </table>` : ""}
  </div>`;

  // Helper to render comparative section + family analysis
  const comparativeSection = !hasComparative ? "" : `
  <div style="margin-bottom:24px;page-break-inside:avoid">
    <div style="font-size:11px;font-weight:700;color:#57534E;text-transform:uppercase;letter-spacing:.08em;margin-bottom:8px;display:flex;align-items:center;gap:8px">
      <span style="background:#1E40AF;color:#fff;padding:3px 8px;border-radius:4px;font-size:10px">📈 Sección 3</span>
      <span>Análisis comparativo · Lo comprado vs lo consumido</span>
    </div>

    <!-- Hero: 4 cifras grandes -->
    <div style="background:linear-gradient(135deg,#1E40AF 0%,#1E3A8A 100%);background-color:#1E40AF;border-radius:10px;padding:18px;color:#fff;margin-bottom:14px">
      <table style="width:100%;border-collapse:separate;border-spacing:8px">
        <tr>
          <td style="background:rgba(255,255,255,0.1);border-radius:8px;padding:12px;text-align:center">
            <div style="font-size:9px;color:#DBEAFE;font-weight:700;text-transform:uppercase;letter-spacing:.06em;margin-bottom:4px">Comprado</div>
            <div style="font-family:'SF Mono',monospace;font-size:20px;font-weight:800">${fmt(proposalEffectiveTotal)}</div>
            <div style="font-size:9px;color:#DBEAFE;margin-top:3px">cr/año</div>
          </td>
          <td style="background:rgba(255,255,255,0.1);border-radius:8px;padding:12px;text-align:center">
            <div style="font-size:9px;color:#DBEAFE;font-weight:700;text-transform:uppercase;letter-spacing:.06em;margin-bottom:4px">Consumido</div>
            <div style="font-family:'SF Mono',monospace;font-size:20px;font-weight:800">${fmt(usageAnnualTotal)}</div>
            <div style="font-size:9px;color:#DBEAFE;margin-top:3px">cr/año proyectado</div>
          </td>
          <td style="background:rgba(255,255,255,0.1);border-radius:8px;padding:12px;text-align:center">
            <div style="font-size:9px;color:#DBEAFE;font-weight:700;text-transform:uppercase;letter-spacing:.06em;margin-bottom:4px">Eficiencia</div>
            <div style="font-family:'SF Mono',monospace;font-size:20px;font-weight:800;color:${efficiency > 100 ? "#FCA5A5" : "#FFFFFF"}">${efficiency.toFixed(1)}%</div>
            <div style="font-size:9px;color:#DBEAFE;margin-top:3px">de tu pool</div>
          </td>
          <td style="background:rgba(255,255,255,0.1);border-radius:8px;padding:12px;text-align:center">
            <div style="font-size:9px;color:#DBEAFE;font-weight:700;text-transform:uppercase;letter-spacing:.06em;margin-bottom:4px">${efficiency > 100 ? "Déficit" : "Sobrante"}</div>
            <div style="font-family:'SF Mono',monospace;font-size:20px;font-weight:800;color:${efficiency > 100 ? "#FCA5A5" : "#86EFAC"}">${efficiency > 100 ? "+" + fmt(deficit) : fmt(surplus)}</div>
            <div style="font-size:9px;color:#DBEAFE;margin-top:3px">cr/año</div>
          </td>
        </tr>
      </table>
    </div>

    <!-- Educational box -->
    <div style="background:#EFF6FF;border:1px solid #BFDBFE;border-radius:8px;padding:12px 14px;margin-bottom:14px;font-size:11px;color:#0C0A09;line-height:1.55">
      <div style="font-weight:700;color:#1E40AF;margin-bottom:4px">💡 Cómo leer esta auditoría</div>
      Trend Vision One usa un sistema de <strong>créditos flexibles</strong>: cada producto cuesta una cantidad fija de créditos por usuario o dispositivo. Por ejemplo, Endpoint Core cuesta 45 cr/endpoint, Endpoint Pro cuesta 300 cr/endpoint. Comparamos lo que contrataste versus lo que estás consumiendo.
    </div>

    ${audit && audit.familyAnalysis.length > 0 ? `
    <!-- Family-by-family analysis -->
    ${audit.familyAnalysis.map(fa => {
      const hasGrowth = fa.totalUsedCredits > fa.totalBoughtCredits;
      const hasShrink = fa.totalUsedCredits < fa.totalBoughtCredits * 0.5 && fa.totalBoughtCredits > 0;
      const diffAbs = Math.abs(fa.totalUsedCredits - fa.totalBoughtCredits);
      const familyIcon = fa.familyKey === "endpoint" ? "💻" : fa.familyKey === "email" ? "📧" : "🔐";
      return `
      <div style="background:#fff;border:1px solid #E7E5E4;border-radius:10px;padding:14px;margin-bottom:10px;page-break-inside:avoid">
        <!-- Family header -->
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:10px">
          <span style="font-size:18px">${familyIcon}</span>
          <div style="flex:1;font-size:14px;font-weight:800;color:#0C0A09">${fa.familyName}</div>
          ${fa.hasTierEscalation ? `<span style="background:#FEF3C7;color:#92400E;font-size:9px;font-weight:700;padding:2px 7px;border-radius:4px">⚠ Tier superior detectado</span>` : ""}
        </div>

        <!-- Comprado vs Usado -->
        <table style="width:100%;border-collapse:collapse;font-size:11px">
          <tr>
            <td style="width:50%;background:#FAFAF9;border:1px solid #E7E5E4;border-radius:6px;padding:10px;vertical-align:top">
              <div style="font-size:9px;font-weight:700;color:#57534E;text-transform:uppercase;letter-spacing:.05em;margin-bottom:6px">📦 Lo que compraste</div>
              ${fa.totalBoughtQty > 0 ? fa.tiers.map(t => {
                const b = fa.boughtByTier[t.id];
                if (b.qty <= 0) return "";
                return `
                <div style="margin-bottom:5px">
                  <div style="display:flex;justify-content:space-between;font-size:11px">
                    <span><strong>${Math.round(b.qty).toLocaleString()}</strong> como ${t.name}</span>
                    <span style="font-family:'SF Mono',monospace;font-weight:700;color:#B45309">${fmt(b.credits)} cr</span>
                  </div>
                  <div style="font-size:9px;color:#A8A29E;font-family:'SF Mono',monospace">${Math.round(b.qty).toLocaleString()} × ${t.credits} cr</div>
                </div>`;
              }).join("") : `<div style="font-size:11px;color:#A8A29E;font-style:italic">Nada en esta familia</div>`}
              ${fa.totalBoughtCredits > 0 ? `
              <div style="border-top:1px solid #E7E5E4;margin-top:6px;padding-top:6px;display:flex;justify-content:space-between">
                <span style="font-size:9px;font-weight:700;color:#57534E;text-transform:uppercase">Total</span>
                <span style="font-family:'SF Mono',monospace;font-size:12px;font-weight:800;color:#B45309">${fmt(fa.totalBoughtCredits)} cr</span>
              </div>` : ""}
            </td>
            <td style="width:8px"></td>
            <td style="width:50%;background:#FAFAF9;border:1px solid #E7E5E4;border-radius:6px;padding:10px;vertical-align:top">
              <div style="font-size:9px;font-weight:700;color:#57534E;text-transform:uppercase;letter-spacing:.05em;margin-bottom:6px">🔍 Lo que estás usando</div>
              ${fa.totalUsedQty > 0 ? fa.tiers.map(t => {
                const u = fa.usedByTier[t.id];
                if (u.qty <= 0.5) return "";
                const wasBought = fa.boughtByTier[t.id].qty > 0;
                return `
                <div style="margin-bottom:5px">
                  <div style="display:flex;justify-content:space-between;font-size:11px">
                    <span><strong>${Math.round(u.qty).toLocaleString()}</strong> como ${t.name}${!wasBought ? ` <span style="color:#DC2626" title="No comprado en este tier">⚠</span>` : ""}</span>
                    <span style="font-family:'SF Mono',monospace;font-weight:700;color:#1E40AF">${fmt(u.credits)} cr</span>
                  </div>
                  <div style="font-size:9px;color:#A8A29E;font-family:'SF Mono',monospace">${Math.round(u.qty).toLocaleString()} × ${t.credits} cr</div>
                </div>`;
              }).join("") : `<div style="font-size:11px;color:#A8A29E;font-style:italic">Sin consumo detectado</div>`}
              ${fa.totalUsedCredits > 0 ? `
              <div style="border-top:1px solid #E7E5E4;margin-top:6px;padding-top:6px;display:flex;justify-content:space-between">
                <span style="font-size:9px;font-weight:700;color:#57534E;text-transform:uppercase">Total</span>
                <span style="font-family:'SF Mono',monospace;font-size:12px;font-weight:800;color:#1E40AF">${fmt(fa.totalUsedCredits)} cr</span>
              </div>` : ""}
            </td>
          </tr>
        </table>

        <!-- Diferencia + explicación -->
        ${fa.totalBoughtCredits > 0 && fa.totalUsedCredits > 0 && diffAbs > 100 ? `
        <div style="margin-top:10px;background:${hasGrowth ? "#FEF2F2" : (hasShrink ? "#F5F5F4" : "#ECFDF5")};border:1px solid ${hasGrowth ? "#FCA5A5" : (hasShrink ? "#D6D3D1" : "#6EE7B7")};border-radius:7px;padding:10px;font-size:11px;line-height:1.55">
          <div style="font-weight:700;margin-bottom:4px;color:${hasGrowth ? "#991B1B" : (hasShrink ? "#44403C" : "#065F46")}">
            ${hasGrowth ? "📈" : hasShrink ? "📉" : "✅"} ${hasGrowth ? `Estás usando ${fmt(diffAbs)} cr más de lo comprado` : hasShrink ? `Solo usas el ${Math.round((fa.totalUsedCredits / fa.totalBoughtCredits) * 100)}% de lo comprado` : "Tu uso es similar a lo comprado"}
          </div>
          <div style="color:${hasGrowth ? "#7F1D1D" : (hasShrink ? "#57534E" : "#065F46")}">
            ${fa.hasTierEscalation && hasGrowth
              ? `Compraste licencias <strong>${fa.highestBoughtTier.name}</strong> pero detectamos uso en tier <strong>${fa.highestUsedTier.name}</strong>. En Vision One, si activas alguna feature avanzada en una licencia básica, esa licencia automáticamente cuenta como tier superior. <strong>Te recomendamos revisar con tu administrador qué configuración tienen activa.</strong>`
              : hasGrowth
              ? `Tu consumo de ${fa.familyName} excede lo contratado. Puede deberse a crecimiento o activación de funciones adicionales.`
              : hasShrink
              ? `Tienes capacidad disponible. Podrías ajustar este licenciamiento en tu próxima renovación.`
              : ""}
          </div>
        </div>` : ""}
      </div>`;
    }).join("")}

    ${audit && audit.unplannedProducts.length > 0 ? `
    <div style="background:#fff;border:1px solid #E7E5E4;border-radius:10px;padding:14px;margin-bottom:10px;page-break-inside:avoid">
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
        <span style="font-size:18px">🆕</span>
        <div style="flex:1;font-size:13px;font-weight:800;color:#0C0A09">Productos en uso que no están en tu propuesta</div>
      </div>
      <div style="font-size:11px;color:#57534E;margin-bottom:8px;line-height:1.5">
        Estás usando estos servicios desde tu pool de créditos sueltos. Pueden ser activaciones recientes o features que se habilitaron sin contratación específica.
      </div>
      <table style="width:100%;border-collapse:collapse;border:1px solid #E7E5E4;font-size:11px">
        <thead><tr style="background:#F5F5F4">
          <th style="padding:6px 9px;text-align:left;font-size:9px;font-weight:700;color:#57534E;text-transform:uppercase">Servicio</th>
          <th style="padding:6px 9px;text-align:left;font-size:9px;font-weight:700;color:#57534E;text-transform:uppercase">Estimado</th>
          <th style="padding:6px 9px;text-align:right;font-size:9px;font-weight:700;color:#57534E;text-transform:uppercase">Mensual</th>
          <th style="padding:6px 9px;text-align:right;font-size:9px;font-weight:700;color:#57534E;text-transform:uppercase">Anual</th>
        </tr></thead>
        <tbody>
          ${audit.unplannedProducts.map(up => {
            const annualPerUnit = up.prod.credits;
            const estimatedUnits = annualPerUnit > 0 ? Math.round(up.annualUsage / annualPerUnit) : 0;
            const unitLabel = up.prod.unit || "unidad";
            const showEstimate = estimatedUnits > 0 && annualPerUnit > 0;
            return `
            <tr><td style="padding:6px 9px;border-top:1px solid #F5F5F4;font-size:11px;font-weight:600">${up.prod.name}</td>
            <td style="padding:6px 9px;border-top:1px solid #F5F5F4;font-size:11px;color:#57534E">${showEstimate ? `<strong style="color:#0C0A09">≈${fmt(estimatedUnits)}</strong> ${unitLabel}${estimatedUnits !== 1 ? "s" : ""}` : `<span style="color:#A8A29E;font-style:italic">—</span>`}</td>
            <td style="padding:6px 9px;border-top:1px solid #F5F5F4;text-align:right;font-family:'SF Mono',monospace;font-size:11px">${fmt(up.monthlyUsage)} cr</td>
            <td style="padding:6px 9px;border-top:1px solid #F5F5F4;text-align:right;font-family:'SF Mono',monospace;font-size:11px;font-weight:700;color:#1E40AF">${fmt(up.annualUsage)} cr</td></tr>`;
          }).join("")}
        </tbody>
      </table>
      <div style="margin-top:6px;font-size:9px;color:#57534E;line-height:1.5;font-style:italic">
        💡 La columna "Estimado" muestra una aproximación de licencias, usuarios o recursos según la unidad de cada producto. Es referencial — el consumo real puede variar según features activas.
      </div>
    </div>` : ""}

    ${audit && audit.unusedProducts.length > 0 ? `
    <div style="background:#fff;border:1px solid #E7E5E4;border-radius:10px;padding:14px;margin-bottom:10px;page-break-inside:avoid">
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
        <span style="font-size:18px">📦</span>
        <div style="flex:1;font-size:13px;font-weight:800;color:#0C0A09">Productos contratados sin uso detectado</div>
      </div>
      <div style="font-size:11px;color:#57534E;margin-bottom:8px;line-height:1.5">
        Tienes estas licencias contratadas pero no detectamos consumo. Pueden estar pendientes de activación o ya no usarse.
      </div>
      <table style="width:100%;border-collapse:collapse;border:1px solid #E7E5E4;font-size:11px">
        <thead><tr style="background:#F5F5F4">
          <th style="padding:6px 9px;text-align:left;font-size:9px;font-weight:700;color:#57534E;text-transform:uppercase">Producto</th>
          <th style="padding:6px 9px;text-align:right;font-size:9px;font-weight:700;color:#57534E;text-transform:uppercase">Comprado</th>
        </tr></thead>
        <tbody>
          ${audit.unusedProducts.map(un => `
          <tr><td style="padding:6px 9px;border-top:1px solid #F5F5F4;font-size:11px;font-weight:600">${un.prod.name}</td>
          <td style="padding:6px 9px;border-top:1px solid #F5F5F4;text-align:right;font-family:'SF Mono',monospace;font-size:11px;color:#57534E">${fmt(un.qtyBought)} ${un.prod.unit}${un.qtyBought !== 1 ? "s" : ""}</td></tr>`).join("")}
        </tbody>
      </table>
    </div>` : ""}` : ""}

    <!-- Recomendación final -->
    <div style="background:#FAFAF9;border-left:4px solid #1E40AF;padding:12px 16px;border-radius:0 8px 8px 0;margin-top:14px">
      <div style="font-size:11px;font-weight:700;color:#1E40AF;text-transform:uppercase;letter-spacing:.06em;margin-bottom:6px">💡 Recomendación general</div>
      <div style="font-size:11px;color:#0C0A09;line-height:1.55">
        ${efficiency > 100
          ? `<strong>Tu consumo supera lo comprado por ${fmt(deficit)} créditos al año.</strong> Cuando el uso excede el pool contratado, el pool se agota antes del fin del periodo. Para tu próxima renovación, te recomendamos contratar un pool de aproximadamente <strong>${fmt(recommendedAnnual)} créditos</strong> (consumo actual + 10% de margen) para garantizar cobertura completa durante el periodo. <strong>Conversa con tu partner Trend Micro</strong> para revisar opciones.`
          : efficiency < 70
          ? `<strong>Estás muy por debajo de tu pool comprado.</strong> Solo usas el ${efficiency.toFixed(1)}% de tus créditos. Para optimizar, considera un pool de <strong>${fmt(recommendedAnnual)} créditos</strong> (consumo + 10% buffer) y aprovecha el sobrante en otros servicios.`
          : `<strong>Tu pool está bien dimensionado</strong> con sobrante saludable de ${fmt(surplus)} créditos. Para próxima renovación podrías mantener algo similar o considerar <strong>${fmt(recommendedAnnual)} créditos</strong> (consumo + 10% buffer).`
        }
      </div>
    </div>
  </div>`;

  // Helper for new quote section
  const sectionNumber = hasComparative ? "4" : (hasUsage && hasProposal ? "3" : (hasUsage || hasProposal ? "2" : "1"));
  const newQuoteSection = !hasNewQuote ? "" : `
  <div style="margin-bottom:24px">
    <div style="font-size:11px;font-weight:700;color:#57534E;text-transform:uppercase;letter-spacing:.08em;margin-bottom:8px;display:flex;align-items:center;gap:8px">
      <span style="background:#047857;color:#fff;padding:3px 8px;border-radius:4px;font-size:10px">🛒 Sección ${sectionNumber}</span>
      <span>Cotización deseada para próximo periodo</span>
    </div>
    <table style="width:100%;border-collapse:collapse;border:1px solid #E7E5E4;font-size:11px">
      <thead><tr style="background:#F5F5F4">
        ${["#","Producto","Vigencia","Cantidad","Créditos"].map((h,i)=>`<th style="padding:8px 10px;text-align:${i>=3?"right":"left"};font-size:10px;font-weight:700;color:#57534E;text-transform:uppercase;letter-spacing:.05em">${h}</th>`).join("")}
      </tr></thead>
      <tbody>
        ${active.map((l, i) => `<tr>
          <td style="padding:8px 10px;font-size:10px;color:#A8A29E;font-family:'SF Mono',monospace;border-bottom:1px solid #E7E5E4;vertical-align:top">${String(i+1).padStart(2,"0")}</td>
          <td style="padding:8px 10px;font-size:11px;border-bottom:1px solid #E7E5E4;vertical-align:top">
            <strong>${l.prod.name}</strong>
            ${l.isProrated ? `<br><span style="font-size:9px;color:#B45309">⚠ ${l.months}m vigencia</span>` : ""}
          </td>
          <td style="padding:8px 10px;font-size:10px;color:#57534E;border-bottom:1px solid #E7E5E4;font-family:'SF Mono',monospace;vertical-align:top">${l.startDate || "—"} → ${l.date || "—"}</td>
          <td style="padding:8px 10px;font-family:'SF Mono',monospace;text-align:right;border-bottom:1px solid #E7E5E4;vertical-align:top;font-size:11px">${l.qty.toLocaleString()} ${l.prod.unit}${l.qty !== 1 ? "s" : ""}</td>
          <td style="padding:8px 10px;font-family:'SF Mono',monospace;font-weight:700;text-align:right;color:#1E40AF;border-bottom:1px solid #E7E5E4;vertical-align:top;font-size:13px">${fmt(l.prorated)}</td>
        </tr>`).join("")}
      </tbody>
      <tfoot><tr style="background:#EFF6FF;border-top:2px solid #1E40AF">
        <td colspan="4" style="padding:10px;font-size:12px;font-weight:700;color:#1E40AF">TOTAL CRÉDITOS COTIZACIÓN</td>
        <td style="padding:10px;font-size:16px;font-weight:800;font-family:'SF Mono',monospace;text-align:right;color:#1E40AF">${fmt(totalCredits)}</td>
      </tr></tfoot>
    </table>
  </div>`;

  // ════════════════════════════════════════════════════════════════════════
  // SMART PDF MODE: detecta el contexto y adapta el documento
  // ════════════════════════════════════════════════════════════════════════
  let pdfMode, docTitle, docSubtitle;
  if (hasComparative) {
    pdfMode = "comparative";
    docTitle = `Análisis Comparativo Vision One${clientName ? " — " + clientName : ""}`;
    docSubtitle = "Lo contratado vs lo consumido · Recomendación de renovación";
  } else if (hasUsage && hasNewQuote) {
    pdfMode = "usage_with_quote";
    docTitle = `Análisis de Consumo y Recomendación${clientName ? " — " + clientName : ""}`;
    docSubtitle = "Consumo actual y propuesta de pool dimensionado";
  } else if (hasUsage) {
    pdfMode = "usage_only";
    docTitle = `Análisis de Consumo Vision One${clientName ? " — " + clientName : ""}`;
    docSubtitle = `Reporte de consumo${usageMonth ? ` · ${usageMonth}` : ""}`;
  } else if (hasProposal && hasNewQuote) {
    pdfMode = "proposal_with_quote";
    docTitle = `Estimado Vision One${clientName ? " — " + clientName : ""}`;
    docSubtitle = "Resumen de contrato actual y nueva cotización";
  } else if (hasProposal) {
    pdfMode = "proposal_only";
    docTitle = `Resumen de Contrato Vision One${clientName ? " — " + clientName : ""}`;
    docSubtitle = `Pool contratado${proposalPeriod ? ` · ${proposalPeriod}` : ""}`;
  } else {
    pdfMode = "quote_only";
    docTitle = `Estimado Vision One${clientName ? " — " + clientName : ""}`;
    docSubtitle = "Cálculo de créditos requeridos";
  }

  const html = `<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8"><title>${docTitle}</title>
<style>
  *{box-sizing:border-box;margin:0;padding:0}
  body{font-family:system-ui,-apple-system,sans-serif;color:#0C0A09;background:#fff;font-size:13px;padding:24px 28px}
  .container{max-width:780px;margin:0 auto}
  @page{margin:14mm 12mm;size:A4}
  @media print{body{padding:0;print-color-adjust:exact;-webkit-print-color-adjust:exact}.container{max-width:none}}
  @media screen{.print-toolbar{display:flex;position:sticky;top:0;background:#0C0A09;color:#fff;padding:12px 20px;margin:-24px -28px 24px;align-items:center;justify-content:space-between;z-index:100}.print-toolbar button{background:#fff;color:#0C0A09;border:none;padding:8px 18px;border-radius:6px;font-weight:600;cursor:pointer;font-size:13px}}
  @media print{.print-toolbar{display:none}}
</style></head>
<body>
<div class="container pdf-content">
  <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:24px;padding-bottom:16px;border-bottom:2px solid #0C0A09">
    <div style="display:flex;align-items:center;gap:14px">
      <img src="${NEXTCOM_LOGO}" alt="Nextcom" style="height:38px;width:auto" />
      <div style="border-left:1px solid #E7E5E4;padding-left:14px">
        <div style="font-size:11px;color:#A8A29E;font-weight:500">${docSubtitle}</div>
        <div style="font-size:14px;color:#0C0A09;font-weight:700;letter-spacing:-.01em">Trend Vision One${clientName ? ` · ${clientName}` : ""}</div>
      </div>
    </div>
    <div style="text-align:right;display:flex;flex-direction:column;align-items:flex-end;gap:6px">
      <img src="${TRENDAI_LOGO}" alt="TrendAI" style="height:26px;width:auto" />
      <div style="font-size:11px;color:#A8A29E">${today}</div>
      <div style="display:inline-block;background:#EFF6FF;color:#1E40AF;font-size:9px;font-weight:700;padding:3px 9px;border-radius:4px;letter-spacing:.04em">DOCUMENTO PRELIMINAR</div>
    </div>
  </div>

  ${hasNewQuote ? `
  <div style="background:linear-gradient(135deg,#1E40AF 0%,#1E3A8A 100%);background-color:#1E40AF;border-radius:12px;padding:20px;margin-bottom:24px;color:#fff;text-align:center">
    <div style="font-size:11px;color:#BFDBFE;text-transform:uppercase;letter-spacing:.08em;margin-bottom:6px">Total de la cotización</div>
    <div style="font-family:'SF Mono',monospace;font-size:42px;font-weight:800;line-height:1;letter-spacing:-.02em">${fmt(totalCredits)}</div>
    <div style="font-size:12px;color:#BFDBFE;margin-top:6px">créditos Vision One para ${active.length} producto${active.length !== 1 ? "s" : ""}</div>
  </div>` : ""}

  ${usageSection}
  ${proposalSection}
  ${comparativeSection}
  ${newQuoteSection}

  <div style="background:#FAFAF9;border-left:4px solid #1E40AF;padding:14px 18px;border-radius:0 8px 8px 0;margin-bottom:18px">
    <div style="font-size:12px;font-weight:700;color:#0C0A09;margin-bottom:6px">📋 Importante</div>
    <div style="font-size:11px;color:#57534E;line-height:1.6">
      Este documento refleja únicamente cantidades de créditos Vision One. <strong>El precio final del licenciamiento será proporcionado por Nextcom Systems</strong> en una cotización formal, considerando volumen, soporte adicional y términos comerciales.
    </div>
  </div>

  ${contactName || contactEmail || contactPhone ? `
  <div style="background:#FFFBEB;border:1px solid #FDE68A;border-radius:8px;padding:14px 18px;margin-bottom:20px">
    <div style="font-size:12px;font-weight:700;color:#B45309;margin-bottom:6px">📞 Datos de contacto</div>
    <div style="font-size:12px;color:#57534E;line-height:1.6">
      ${contactName ? `<div><strong>Nombre:</strong> ${contactName}</div>` : ""}
      ${contactEmail ? `<div><strong>Email:</strong> ${contactEmail}</div>` : ""}
      ${contactPhone ? `<div><strong>Teléfono:</strong> ${contactPhone}</div>` : ""}
    </div>
  </div>` : ""}

  <div style="margin-top:32px;padding-top:14px;border-top:1px solid #E7E5E4;text-align:center">
    <div style="font-size:11px;color:#0C0A09;font-weight:600;margin-bottom:3px">Nextcom Systems, Inc.</div>
    <div style="font-size:10px;color:#A8A29E;line-height:1.5">
      Trend Micro Platinum Partner · Panamá<br>
      +507 394-1405 · administracion@nextcomsystems.com · ISO 9001:2015 · ISO 27001:2022
    </div>
  </div>
</div>
</body></html>`;

  const filenamePrefix = (
    pdfMode === "comparative" ? "Analisis_Comparativo" :
    pdfMode === "usage_with_quote" ? "Analisis_Consumo_Recomendacion" :
    pdfMode === "usage_only" ? "Analisis_Consumo" :
    pdfMode === "proposal_with_quote" ? "Estimado_VisionOne" :
    pdfMode === "proposal_only" ? "Resumen_Contrato" :
    "Estimado_VisionOne"
  );
  const filename = `${filenamePrefix}_${(clientName || "cliente").replace(/\s+/g,"_")}_${new Date().toISOString().split("T")[0]}.pdf`;

  // Generar PDF real desde el HTML
  return generatePdfFromHtml(html, filename).catch(err => {
    console.error("Error generando PDF:", err);
    alert("No se pudo generar el PDF. Por favor verifica tu conexión a internet e inténtalo de nuevo.\n\nDetalle: " + err.message);
    throw err;
  });
}

function ClientApp() {
  const isMobile = useIsMobile();
  const [lines, setLines] = useState([]);
  const [rc, setRc] = useState(1);
  const [clientName, setClientName] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [pdfLoading, setPdfLoading] = useState(false);
  const [autofillToast, setAutofillToast] = useState(""); // toast feedback "8 productos detectados..."

  // Wrapper para descargar PDF con loading state
  const handleDownloadPdf = async () => {
    if (pdfLoading) return;
    setPdfLoading(true);
    try {
      await downloadEstimate({
        lines, totalCredits, clientName, contactName, contactEmail, contactPhone,
        usageItems, usageMonth, usageMonthlyTotal, usageAnnualTotal,
        proposalItems, proposalEffectiveTotal, proposalTotalPool, proposalDate, proposalPeriod,
        hasComparative, efficiency, surplus, deficit, recommendedAnnual
      });
    } catch (err) {
      console.error("Error al generar PDF:", err);
    } finally {
      setPdfLoading(false);
    }
  };

  // --- Consumo actual (Mi Drawdown) ---
  const [usageOpen, setUsageOpen] = useState(false);     // panel expandido?
  const [usageItems, setUsageItems] = useState([]);      // [{name, monthly, prodId, confidence, sourceFiles:[name]}]
  const [usageMonth, setUsageMonth] = useState("");      // "April 2026"
  const [usageLoading, setUsageLoading] = useState(false);
  const [usageProgress, setUsageProgress] = useState(""); // "Procesando 1 de 3..."
  const [usageError, setUsageError] = useState("");
  const [usageFiles, setUsageFiles] = useState([]);      // [{name, productCount, monthlyTotal}]
  const usageFileRef = useRef(null);

  // --- Propuesta anterior ---
  const [proposalItems, setProposalItems] = useState([]);     // [{name, qty, prodId, confidence, creditsPerUnit, totalCredits, sourceFile, startDate, endDate}]
  const [proposalTotalPool, setProposalTotalPool] = useState(0);
  const [proposalDate, setProposalDate] = useState("");
  const [proposalPeriod, setProposalPeriod] = useState("");
  const [proposalLoading, setProposalLoading] = useState(false);
  const [proposalProgress, setProposalProgress] = useState(""); // "Procesando 1 de 3..."
  const [proposalError, setProposalError] = useState("");
  const [proposalFiles, setProposalFiles] = useState([]);     // [{name, productCount, poolCredits, period, startDate, endDate}]
  const proposalFileRef = useRef(null);

  // --- Unificación de fechas (cuando hay multiples contratos) ---
  const [unifyOpen, setUnifyOpen] = useState(false);
  const [unifyTargetDate, setUnifyTargetDate] = useState("");
  const [unifyStartDate, setUnifyStartDate] = useState(""); // empty = use today

  // ════════════════════════════════════════════════════════════════════════
  // AUTOFILL HELPERS
  // Toman los items detectados por IA (consumo o propuesta) y rellenan el
  // selector manual `lines`. Cada línea queda marcada con su origen para
  // trazabilidad ("from_usage", "from_proposal", "manual").
  // Si ya hay una línea manual con el mismo producto, se conserva el manual
  // (asumimos que el cliente sabe lo que quiere).
  // ════════════════════════════════════════════════════════════════════════
  const autofillFromUsage = (newUsageItems, monthLabel) => {
    if (!newUsageItems || newUsageItems.length === 0) return;
    const d = defaultDates();
    setLines(prev => {
      const existingProdIds = new Set(prev.filter(l => l.prodId).map(l => l.prodId));
      const startId = prev.length > 0 ? Math.max(...prev.map(l => l.rowId)) : 0;
      let nextId = startId + 1;
      const skipped = [];

      const fromUsage = newUsageItems
        .filter(item => item.prodId)
        .map(item => {
          if (existingProdIds.has(item.prodId)) {
            skipped.push(item.name);
            return null;
          }
          existingProdIds.add(item.prodId);
          const prod = CATALOG.find(p => p.id === item.prodId);
          if (!prod || !prod.credits) return null;
          const annualCr = (Number(item.monthly) || 0) * 12;
          const estimatedQty = Math.round(annualCr / prod.credits);
          if (estimatedQty <= 0) return null;
          return {
            rowId: nextId++,
            prodId: item.prodId,
            qty: estimatedQty,
            date: d.date,
            startDate: d.startDate,
            origin: "from_usage",
            originMeta: {
              monthlyCr: Number(item.monthly) || 0,
              annualCr,
              monthLabel: monthLabel || "",
              detectedName: item.name
            }
          };
        })
        .filter(Boolean);

      if (fromUsage.length === 0) {
        if (skipped.length > 0) {
          setAutofillToast(`${skipped.length} producto${skipped.length === 1 ? "" : "s"} ya estaba${skipped.length === 1 ? "" : "n"} en el selector — mantuvimos las cantidades manuales.`);
          setTimeout(() => setAutofillToast(""), 6000);
        }
        return prev;
      }

      setRc(nextId);
      const total = fromUsage.length;
      const skipMsg = skipped.length > 0 ? ` (${skipped.length} ya existía${skipped.length === 1 ? "" : "n"} y se mantuv${skipped.length === 1 ? "o" : "ieron"})` : "";
      setAutofillToast(`${total} producto${total === 1 ? "" : "s"} agregado${total === 1 ? "" : "s"} desde el reporte de consumo${skipMsg}.`);
      setTimeout(() => setAutofillToast(""), 6000);

      return [...prev, ...fromUsage];
    });
  };

  const autofillFromProposal = (newProposalItems) => {
    if (!newProposalItems || newProposalItems.length === 0) return;
    const d = defaultDates();
    setLines(prev => {
      const existingProdIds = new Set(prev.filter(l => l.prodId).map(l => l.prodId));
      const startId = prev.length > 0 ? Math.max(...prev.map(l => l.rowId)) : 0;
      let nextId = startId + 1;
      const skipped = [];

      const fromProposal = newProposalItems
        .filter(item => item.prodId && Number(item.qty) > 0)
        .map(item => {
          if (existingProdIds.has(item.prodId)) {
            skipped.push(item.name);
            return null;
          }
          existingProdIds.add(item.prodId);
          const startDate = item.startDate || d.startDate;
          const endDate = item.endDate || d.date;
          return {
            rowId: nextId++,
            prodId: item.prodId,
            qty: Number(item.qty),
            date: endDate,
            startDate,
            origin: "from_proposal",
            originMeta: {
              creditsPerUnit: item.creditsPerUnit,
              totalCredits: item.totalCredits,
              sourceFile: item.sourceFile,
              detectedName: item.name
            }
          };
        })
        .filter(Boolean);

      if (fromProposal.length === 0) {
        if (skipped.length > 0) {
          setAutofillToast(`${skipped.length} producto${skipped.length === 1 ? "" : "s"} ya estaba${skipped.length === 1 ? "" : "n"} en el selector — mantuvimos las cantidades.`);
          setTimeout(() => setAutofillToast(""), 6000);
        }
        return prev;
      }

      setRc(nextId);
      const total = fromProposal.length;
      const skipMsg = skipped.length > 0 ? ` (${skipped.length} ya existía${skipped.length === 1 ? "" : "n"})` : "";
      setAutofillToast(`${total} producto${total === 1 ? "" : "s"} agregado${total === 1 ? "" : "s"} desde la propuesta${skipMsg}.`);
      setTimeout(() => setAutofillToast(""), 6000);

      return [...prev, ...fromProposal];
    });
  };

  // Helper: process one usage file and return parsed items
  const processOneUsageFile = async (file, attempt = 1) => {
    if (!file.type.startsWith("image/")) {
      throw new Error(`"${file.name}": solo imágenes`);
    }
    const reader = new FileReader();
    const b64 = await new Promise((resolve, reject) => {
      reader.onload = () => resolve(reader.result.split(",")[1]);
      reader.onerror = () => reject(new Error("Error leyendo archivo"));
      reader.readAsDataURL(file);
    });
    const resp = await fetch("/api/parse-usage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fileData: b64, fileType: file.type }),
    });

    // Defensive: server may return HTML (404 page, 500 error) instead of JSON
    const respText = await resp.text();
    let data;
    try {
      data = JSON.parse(respText);
    } catch (e) {
      // Detect Vercel timeout (504 or "A server error" page)
      const isTimeout = resp.status === 504 ||
                        respText.includes("FUNCTION_INVOCATION_TIMEOUT") ||
                        respText.includes("A server error") ||
                        respText.includes("server error has occurred");
      if (isTimeout && attempt < 2) {
        // Retry once after a short delay
        await new Promise(r => setTimeout(r, 1500));
        return processOneUsageFile(file, attempt + 1);
      }
      if (resp.status === 404) {
        throw new Error(`El servicio /api/parse-usage no está disponible. Verifica que el archivo parse-usage.js esté en la carpeta api/ del repo y que Vercel haya redeployado.`);
      } else if (isTimeout) {
        throw new Error(`"${file.name}": el análisis tardó demasiado y Vercel canceló la operación. Habilita Fluid Compute en Vercel Settings → Functions para resolver esto.`);
      } else if (resp.status === 500 || resp.status === 502 || resp.status === 503) {
        throw new Error(`El servicio falló (HTTP ${resp.status}). Verifica que ANTHROPIC_API_KEY esté configurada en Vercel y que el deploy esté completo.`);
      } else {
        throw new Error(`Respuesta inesperada del servidor (HTTP ${resp.status}). Reintenta o contacta soporte.`);
      }
    }

    if (!resp.ok) throw new Error(data.error || "Error procesando " + file.name);
    if (!data.products || data.products.length === 0) {
      throw new Error(`"${file.name}": no detecté productos Vision One`);
    }
    return { products: data.products, monthLabel: data.month_label || "" };
  };

  const onUsageFile = async (files) => {
    const fileList = Array.from(files || []);
    if (fileList.length === 0) return;

    setUsageLoading(true);
    setUsageError("");
    setUsageProgress(fileList.length > 1 ? `Iniciando análisis de ${fileList.length} archivo(s)...` : "");
    const errors = [];
    const newFileEntries = [];
    const newItems = [];
    let earliestMonth = usageMonth;

    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      if (fileList.length > 1) {
        setUsageProgress(`Procesando ${i + 1} de ${fileList.length}: ${file.name.length > 30 ? file.name.slice(0, 27) + "..." : file.name}`);
      }
      try {
        const { products, monthLabel } = await processOneUsageFile(file);
        let monthlyTotal = 0;
        products.forEach(p => {
          const monthly = Number(p.monthly_credits) || 0;
          monthlyTotal += monthly;
          // KEEP EACH DETECTION AS A SEPARATE LINE
          newItems.push({
            rowId: `u${Date.now()}_${Math.random().toString(36).slice(2,7)}`,
            nameInScreenshot: p.name_in_screenshot || "",
            monthly: monthly,
            prodId: p.matched_id || null,
            confidence: p.match_confidence || "low",
            sourceFile: file.name,
          });
        });
        newFileEntries.push({
          name: file.name,
          productCount: products.length,
          monthlyTotal,
          monthLabel,
        });
        if (monthLabel && !earliestMonth) earliestMonth = monthLabel;
      } catch (e) {
        errors.push(e.message);
      }
    }

    setUsageItems(prev => [...prev, ...newItems]);
    setUsageFiles(prev => [...prev, ...newFileEntries]);
    if (earliestMonth) setUsageMonth(earliestMonth);
    if (newFileEntries.length > 0) setUsageOpen(true);
    if (errors.length > 0) setUsageError(errors.join(" · "));
    setUsageLoading(false);
    setUsageProgress("");
    if (usageFileRef.current) usageFileRef.current.value = "";

    // 🎯 AUTOFILL: rellena el selector manual con productos detectados
    if (newItems.length > 0) {
      autofillFromUsage(newItems, earliestMonth);
    }
  };

  // Helper: process one proposal file
  const processOneProposalFile = async (file, attempt = 1) => {
    const okTypes = ["application/pdf", "text/plain"];
    if (!file.type.startsWith("image/") && !okTypes.includes(file.type)) {
      throw new Error(`"${file.name}": formato no soportado`);
    }
    const reader = new FileReader();
    const b64 = await new Promise((resolve, reject) => {
      reader.onload = () => resolve(reader.result.split(",")[1]);
      reader.onerror = () => reject(new Error("Error leyendo archivo"));
      reader.readAsDataURL(file);
    });
    const resp = await fetch("/api/parse-proposal", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fileData: b64, fileType: file.type || "application/octet-stream" }),
    });

    // Defensive: server may return HTML (404 page, 500 error) instead of JSON
    const respText = await resp.text();
    let data;
    try {
      data = JSON.parse(respText);
    } catch (e) {
      const isTimeout = resp.status === 504 ||
                        respText.includes("FUNCTION_INVOCATION_TIMEOUT") ||
                        respText.includes("A server error") ||
                        respText.includes("server error has occurred");
      if (isTimeout && attempt < 2) {
        await new Promise(r => setTimeout(r, 1500));
        return processOneProposalFile(file, attempt + 1);
      }
      if (resp.status === 404) {
        throw new Error(`El servicio /api/parse-proposal no está disponible. Verifica que el archivo parse-proposal.js esté en la carpeta api/ del repo y que Vercel haya redeployado.`);
      } else if (isTimeout) {
        throw new Error(`"${file.name}": el análisis tardó demasiado y Vercel canceló la operación. Habilita Fluid Compute en Vercel Settings → Functions para resolver esto.`);
      } else if (resp.status === 500 || resp.status === 502 || resp.status === 503) {
        throw new Error(`El servicio falló (HTTP ${resp.status}). Verifica que ANTHROPIC_API_KEY esté configurada en Vercel y que el deploy esté completo.`);
      } else {
        throw new Error(`Respuesta inesperada del servidor (HTTP ${resp.status}). Reintenta o contacta soporte.`);
      }
    }

    if (!resp.ok) throw new Error(data.error || "Error procesando " + file.name);
    return data;
  };

  const onProposalFile = async (files) => {
    const fileList = Array.from(files || []);
    if (fileList.length === 0) return;

    setProposalLoading(true);
    setProposalError("");
    setProposalProgress(fileList.length > 1 ? `Iniciando análisis de ${fileList.length} archivo(s)...` : "");
    const errors = [];
    const newFileEntries = [];
    const newItems = [];
    let totalPoolDelta = 0;
    let lastDate = proposalDate;
    let lastPeriod = proposalPeriod;

    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      if (fileList.length > 1) {
        setProposalProgress(`Procesando ${i + 1} de ${fileList.length}: ${file.name.length > 30 ? file.name.slice(0, 27) + "..." : file.name}`);
      }
      try {
        const data = await processOneProposalFile(file);
        const rawProducts = data.products || [];
        const filePool = Number(data.total_credits_purchased) || 0;
        const sourceType = data.source_type || "informal";

        // For source dates: use what the AI found, or empty if unknown
        const fileGlobalStart = data.proposal_start_date || "";
        const fileGlobalEnd = data.proposal_end_date || "";

        // ════════════════════════════════════════════════════════════
        // DETECCIÓN DE POOLS:
        // El backend NO debe llenar total_credits_purchased — todo viene
        // en products[]. El frontend identifica cuáles son pools y los mueve
        // a "standalonePool" (créditos sueltos) vs productos individuales.
        //
        // Un item es POOL si:
        //   - matched_id === "AK"
        //   - O su SKU está en la lista de pool SKUs
        //   - O su nombre contiene "Vision One Credits" / "Pool de créditos"
        // ════════════════════════════════════════════════════════════
        const POOL_SKUS = ["VONN0000", "VORN0232", "VORN0309", "VONN0309", "VONN0358"];
        let standalonePool = filePool;  // por si el backend insiste en llenarlo
        const products = [];
        rawProducts.forEach(p => {
          const sku = (p.sku || "").toUpperCase().trim();
          const nameMatch = (p.name_in_proposal || "").toLowerCase();
          const isPoolBySku = POOL_SKUS.includes(sku);
          const isPoolByName = nameMatch.includes("vision one credits") ||
                               nameMatch.includes("pool de créditos") ||
                               nameMatch.includes("pool de creditos");
          const isPoolById = p.matched_id === "AK";
          const isPoolRow = isPoolBySku || isPoolByName || isPoolById;

          if (isPoolRow) {
            // Para pools, el "Volume" (quantity) ES directamente la cantidad de créditos
            // Trend Vision One Credits Normal 1+ Credits New, Volume: 2135 → 2,135 cr
            const credits = Number(p.total_credits) || Number(p.quantity) || 0;
            standalonePool += credits;
          } else {
            products.push(p);
          }
        });

        // ════════════════════════════════════════════════════════════
        // FILTRO ANTI DOBLE-CONTEO:
        // Si standalonePool coincide EXACTAMENTE con la suma de productos,
        // la IA confundió campos → descartar el pool fantasma
        // ════════════════════════════════════════════════════════════
        const productsSum = products.reduce((s, p) => {
          const tc = Number(p.total_credits) || ((Number(p.quantity) || 0) * (Number(p.credits_per_unit) || 0));
          return s + tc;
        }, 0);
        if (standalonePool > 0 && productsSum > 0 && standalonePool === productsSum) {
          standalonePool = 0;
        }

        let computedFromProducts = 0;

        products.forEach(p => {
          const qty = Number(p.quantity) || 0;
          const cpu = Number(p.credits_per_unit) || 0;
          const tc = Number(p.total_credits) || (qty * cpu);
          computedFromProducts += tc;

          // ⚠ SUSPICION CHECK: detectar si la IA confundió el rango con la cantidad
          // Patrones tipo "Normal 51-250", "Normal 251-500", "Normal 1-100" en el nombre
          // y el qty coincide EXACTAMENTE con uno de los límites del rango
          let suspiciousQty = false;
          const nameStr = (p.name_in_proposal || "").toLowerCase();
          const rangeMatch = nameStr.match(/normal\s+(\d+)\s*[-]\s*(\d+)/);
          if (rangeMatch) {
            const lower = parseInt(rangeMatch[1]);
            const upper = parseInt(rangeMatch[2]);
            // Si el qty coincide exactamente con uno de los límites del rango, es muy sospechoso
            if (qty === lower || qty === upper) {
              suspiciousQty = true;
            }
          }

          // Date confidence per product
          const datesConf = p.dates_confidence || "unknown";
          let pStart = "";
          let pEnd = "";
          if (datesConf === "explicit") {
            pStart = p.start_date || "";
            pEnd = p.end_date || "";
          } else if (datesConf === "inferred") {
            pStart = p.start_date || fileGlobalStart || "";
            pEnd = p.end_date || fileGlobalEnd || "";
          }

          newItems.push({
            rowId: `p${Date.now()}_${Math.random().toString(36).slice(2,7)}`,
            nameInProposal: p.name_in_proposal || "",
            sku: p.sku || "",
            qty: qty,
            prodId: p.matched_id || null,
            confidence: p.match_confidence || "low",
            creditsPerUnit: cpu,
            totalCredits: tc,
            sourceFile: file.name,
            sourceType: sourceType,
            datesConfidence: datesConf,
            startDate: pStart,
            endDate: pEnd,
            suspiciousQty: suspiciousQty,
          });
        });

        // Total de archivo = pool standalone + productos individuales (suma)
        totalPoolDelta += standalonePool;
        const fileTotalCredits = standalonePool + computedFromProducts;

        newFileEntries.push({
          name: file.name,
          productCount: products.length,
          poolCredits: fileTotalCredits,           // total del archivo (pool + productos)
          poolStandalone: standalonePool,
          productsTotal: computedFromProducts,
          period: data.proposal_period || "",
          date: data.proposal_date || "",
          sourceType: sourceType,
          startDate: fileGlobalStart,
          endDate: fileGlobalEnd,
          customerNo: data.customer_no || "",
        });

        if (data.client_name && !clientName) setClientName(data.client_name);
        if (data.proposal_date) lastDate = data.proposal_date;
        if (data.proposal_period) lastPeriod = data.proposal_period;

        if (products.length === 0 && filePool === 0) {
          errors.push(`"${file.name}": no se detectó información Vision One`);
        }
      } catch (e) {
        errors.push(e.message);
      }
    }

    setProposalItems(prev => [...prev, ...newItems]);
    setProposalTotalPool(prev => prev + totalPoolDelta);
    setProposalFiles(prev => [...prev, ...newFileEntries]);
    if (lastDate) setProposalDate(lastDate);
    if (lastPeriod) setProposalPeriod(lastPeriod);
    if (errors.length > 0) setProposalError(errors.join(" · "));
    setProposalLoading(false);
    setProposalProgress("");
    if (proposalFileRef.current) proposalFileRef.current.value = "";

    // 🎯 AUTOFILL: rellena el selector manual con productos comprados
    if (newItems.length > 0) {
      autofillFromProposal(newItems);
    }
  };

  const updateUsageItem = (rowId, field, value) => {
    setUsageItems(prev => prev.map(it => it.rowId === rowId ? { ...it, [field]: value } : it));
  };
  const deleteUsageItem = (rowId) => {
    setUsageItems(prev => prev.filter(it => it.rowId !== rowId));
  };
  const clearUsage = () => {
    if (confirm("¿Borrar todos los archivos y el análisis de consumo?")) {
      setUsageItems([]);
      setUsageMonth("");
      setUsageError("");
      setUsageFiles([]);
      setUsageOpen(false);
      // También quitar líneas autocompletadas desde consumo del selector
      // (mantener líneas manuales y editadas — el cliente las creó/modificó conscientemente)
      setLines(prev => prev.filter(l => l.origin !== "from_usage" && l.origin !== "edited_usage"));
    }
  };

  const updateProposalItem = (rowId, field, value) => {
    setProposalItems(prev => prev.map(it => {
      if (it.rowId !== rowId) return it;
      const updated = { ...it, [field]: value };
      // Recalc total when qty or creditsPerUnit changes
      if (field === "qty" || field === "creditsPerUnit") {
        updated.totalCredits = (Number(updated.qty) || 0) * (Number(updated.creditsPerUnit) || 0);
        // User edited qty manually → ya no es "sospechosa"
        if (field === "qty") updated.suspiciousQty = false;
      }
      // When user manually edits dates, mark as confirmed by user
      if (field === "startDate" || field === "endDate") {
        if (value && it.datesConfidence === "unknown") {
          updated.datesConfidence = "user_confirmed";
        }
      }
      return updated;
    }));
  };
  const deleteProposalItem = (rowId) => {
    setProposalItems(prev => prev.filter(it => it.rowId !== rowId));
  };
  const clearProposal = () => {
    if (confirm("¿Borrar todos los archivos y la propuesta anterior?")) {
      setProposalItems([]);
      setProposalTotalPool(0);
      setProposalDate("");
      setProposalPeriod("");
      setProposalError("");
      setProposalFiles([]);
      // También quitar líneas autocompletadas desde propuesta del selector
      setLines(prev => prev.filter(l => l.origin !== "from_proposal" && l.origin !== "edited_proposal"));
    }
  };

  // Compute usage totals
  let usageMonthlyTotal = 0;
  let usageAnnualTotal = 0;
  usageItems.forEach(it => {
    usageMonthlyTotal += Number(it.monthly) || 0;
    usageAnnualTotal += (Number(it.monthly) || 0) * 12;
  });

  // Compute proposal computed total (from line items)
  let proposalComputedTotal = 0;
  proposalItems.forEach(it => {
    proposalComputedTotal += Number(it.totalCredits) || 0;
  });
  // POOL ES ADITIVO con los productos: total = pool standalone + suma de productos
  // proposalTotalPool ya viene calculado correctamente desde onProposalFile
  // (que distingue pool standalone de pool dentro de products para no doble-contar)
  const proposalEffectiveTotal = proposalTotalPool + proposalComputedTotal;

  // Count items that need date confirmation
  const itemsNeedingDates = proposalItems.filter(it =>
    !it.startDate || !it.endDate || it.datesConfidence === "unknown"
  );
  const allDatesExplicit = proposalItems.length > 0 && proposalItems.every(it =>
    it.datesConfidence === "explicit" && it.startDate && it.endDate
  );

  // ANALYSIS: do we have enough data for comparative?
  const hasUsage = usageItems.length > 0 && usageAnnualTotal > 0;
  const hasProposal = proposalEffectiveTotal > 0;
  const hasComparative = hasUsage && hasProposal;
  const efficiency = hasComparative ? (usageAnnualTotal / proposalEffectiveTotal) * 100 : 0;
  const surplus = hasComparative ? proposalEffectiveTotal - usageAnnualTotal : 0;
  const deficit = hasComparative ? usageAnnualTotal - proposalEffectiveTotal : 0;
  // Recommendation: usage + 10% buffer, rounded to nearest 10k
  const recommendedAnnual = hasUsage ? Math.ceil((usageAnnualTotal * 1.1) / 10000) * 10000 : 0;

  let totalCredits = 0;
  lines.forEach(l => {
    if (l.prodId && l.qty > 0) {
      const p = CATALOG.find(c => c.id === l.prodId);
      if (p) {
        const months = monthsBetween(l.startDate, l.date);
        totalCredits += l.qty * p.credits * (months / 12);
      }
    }
  });
  totalCredits = Math.round(totalCredits);
  const activeLines = lines.filter(l => l.prodId && l.qty > 0).length;

  const addLine = () => {
    const d = defaultDates();
    setLines(p => [...p, { rowId: rc, prodId: null, qty: 0, date: d.date, startDate: d.startDate, origin: "manual" }]);
    setRc(c => c + 1);
  };
  const updateLine = (row) => setLines(p => p.map(l => {
    if (l.rowId !== row.rowId) return l;
    // Si cambia el qty desde una línea autocompletada, marcar como editada
    if (l.origin === "from_usage" && row.qty !== l.qty) {
      return { ...row, origin: "edited_usage" };
    }
    if (l.origin === "from_proposal" && row.qty !== l.qty) {
      return { ...row, origin: "edited_proposal" };
    }
    // Si cambia el producto entero, vuelve a manual (es otro producto)
    if (l.prodId !== row.prodId && row.prodId !== null && l.prodId !== null) {
      return { ...row, origin: "manual", originMeta: undefined };
    }
    return row;
  }));
  const deleteLine = (id) => setLines(p => p.filter(l => l.rowId !== id));

  const sendWhatsApp = () => {
    const summary = lines.filter(l => l.prodId && l.qty > 0).map(l => {
      const p = CATALOG.find(c => c.id === l.prodId);
      return `• ${p.name}: ${l.qty} ${p.unit}`;
    }).join("\n");
    const msg = `Hola Nextcom, vengo desde el estimador de créditos.${clientName ? `\n\nEmpresa: ${clientName}` : ""}${contactName ? `\nNombre: ${contactName}` : ""}\n\nNecesito una cotización para:\n${summary}\n\nTotal estimado: ${fmt(totalCredits)} créditos Vision One.`;
    window.open(`https://wa.me/50763941405?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: C.bg,
      fontFamily: "system-ui,-apple-system,'Segoe UI',Roboto,sans-serif",
      color: C.text,
      paddingBottom: isMobile ? "calc(120px + env(safe-area-inset-bottom, 0px))" : 40
    }}>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        input::placeholder { color: ${C.text3}; }
        input:focus { outline: none; border-color: ${C.text2} !important; }
        button:focus-visible { outline: 2px solid ${C.blue}; outline-offset: 2px; }
      `}</style>
      <header style={{
        background: C.surface, borderBottom: `1px solid ${C.border}`,
        position: "sticky", top: 0, zIndex: 50
      }}>
        {/* Top row: brand identity */}
        <div style={{
          maxWidth:980, margin:"0 auto",
          padding: isMobile ? "14px 16px" : "18px 32px",
          display:"flex", alignItems:"center", justifyContent:"space-between", gap:12
        }}>
          <img src={NEXTCOM_LOGO} alt="Nextcom Systems" style={{ height:isMobile?32:40, width:"auto" }} />

          <div style={{ display:"flex", alignItems:"center", gap:isMobile?8:12 }}>
            <div style={{
              fontSize: isMobile?9:10, color:C.text3,
              textTransform:"uppercase", letterSpacing:".08em", fontWeight:600,
              textAlign:"right", lineHeight:1.4
            }}>
              {!isMobile && <>Trend Micro<br/></>}Platinum Partner
            </div>
            <div style={{ height: isMobile?24:30, width:1, background:C.border }} />
            <img src={TRENDAI_LOGO} alt="TrendAI" style={{ height:isMobile?22:28, width:"auto" }} />
          </div>
        </div>

        {/* Bottom row: tool title — subtle accent stripe */}
        <div style={{
          background: C.surface,
          borderBottom: `1px solid ${C.border}`,
          padding: isMobile ? "10px 16px" : "12px 32px"
        }}>
          <div style={{ maxWidth: 980, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Package size={14} color={C.text2} strokeWidth={1.75} />
              <span style={{ fontSize: 12, fontWeight: 500, color: C.text2, letterSpacing: ".01em" }}>
                Estimador de Créditos · Trend Vision One
              </span>
            </div>
            {!isMobile && (
              <span style={{ fontSize: 11, color: C.text3, fontWeight: 500 }}>
                Edición Enero 2026
              </span>
            )}
          </div>
        </div>
      </header>

      <main style={{ maxWidth: 980, margin: "0 auto", padding: isMobile ? "20px 14px 80px" : "40px 32px 80px" }}>
        <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 10, padding: isMobile ? 14 : 16, marginBottom: 28 }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: C.text3, textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 10 }}>Información de contacto (opcional)</div>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr 1fr", gap: 10 }}>
            <input type="text" placeholder="Empresa" value={clientName} onChange={e => setClientName(e.target.value)}
              style={{ fontSize: 13, padding: "9px 11px", border: `1px solid ${C.border}`, borderRadius: 7, background: C.surface, outline: "none", boxSizing: "border-box", color: C.text }} />
            <input type="text" placeholder="Tu nombre" value={contactName} onChange={e => setContactName(e.target.value)}
              style={{ fontSize: 13, padding: "9px 11px", border: `1px solid ${C.border}`, borderRadius: 7, background: C.surface, outline: "none", boxSizing: "border-box", color: C.text }} />
            <input type="email" placeholder="Email" value={contactEmail} onChange={e => setContactEmail(e.target.value)}
              style={{ fontSize: 13, padding: "9px 11px", border: `1px solid ${C.border}`, borderRadius: 7, background: C.surface, outline: "none", boxSizing: "border-box", color: C.text }} />
            <input type="tel" placeholder="Teléfono" value={contactPhone} onChange={e => setContactPhone(e.target.value)}
              style={{ fontSize: 13, padding: "9px 11px", border: `1px solid ${C.border}`, borderRadius: 7, background: C.surface, outline: "none", boxSizing: "border-box", color: C.text }} />
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════
             SELECTOR MANUAL — Sin gradientes, sin emojis. Tipografía hace el trabajo.
        ═══════════════════════════════════════════════════════════════ */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ marginBottom: 6 }}>
            <div style={{
              fontSize: 11, color: C.text3, fontWeight: 600, textTransform: "uppercase",
              letterSpacing: ".06em", marginBottom: 6
            }}>
              Calculadora Vision One
            </div>
            <h1 style={{
              fontSize: isMobile ? 22 : 26, fontWeight: 600, color: C.text,
              margin: 0, letterSpacing: "-.015em", lineHeight: 1.2
            }}>
              ¿Cuántos créditos necesitas?
            </h1>
            <p style={{
              fontSize: isMobile ? 13 : 14, color: C.text2, margin: "6px 0 0",
              lineHeight: 1.55, maxWidth: 560
            }}>
              Selecciona los productos que tu empresa requiere y te indicamos el total de créditos a contratar.
            </p>
          </div>
        </div>

        {/* Toast de feedback de autofill */}
        {autofillToast && (
          <div style={{
            display: "flex", alignItems: "center", gap: 10,
            padding: "10px 14px", background: "#EFF6FF",
            border: "1px solid #DBEAFE", borderRadius: 10,
            marginBottom: 14, fontSize: 13, color: "#1E3A8A",
            lineHeight: 1.5
          }}>
            <Sparkles size={14} color="#1E40AF" strokeWidth={2} style={{ flexShrink: 0 }} />
            <span>{autofillToast}</span>
            <button onClick={() => setAutofillToast("")}
              style={{ marginLeft: "auto", background: "transparent", border: "none", color: "#1E40AF", cursor: "pointer", padding: 4, display: "flex", flexShrink: 0 }}>
              <X size={14} strokeWidth={2.25} />
            </button>
          </div>
        )}

        {/* Container unificado del selector + agregar */}
        <div style={{
          background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12,
          overflow: "hidden", marginBottom: 28
        }}>
          {lines.length === 0 ? (
            // Estado vacío
            <div style={{
              padding: isMobile ? "32px 20px" : "44px 28px",
              textAlign: "center"
            }}>
              <div style={{
                width: 44, height: 44, borderRadius: "50%",
                background: C.bg, border: `1px solid ${C.border}`,
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                marginBottom: 12
              }}>
                <Package size={20} color={C.text3} strokeWidth={1.5} />
              </div>
              <div style={{ fontSize: 14, fontWeight: 500, color: C.text, marginBottom: 4 }}>
                Aún no has agregado productos
              </div>
              <div style={{ fontSize: 12.5, color: C.text2, lineHeight: 1.55, maxWidth: 380, margin: "0 auto" }}>
                Agrega productos manualmente o sube un documento más abajo y los completaremos por ti.
              </div>
            </div>
          ) : (
            lines.map((line, idx) => (
              <LineCard key={line.rowId} line={line} idx={idx} onUpdate={updateLine} onDelete={deleteLine} isMobile={isMobile} />
            ))
          )}
          <button onClick={addLine} style={{
            width: "100%", display: "flex", alignItems: "center", justifyContent: "flex-start",
            gap: 8, padding: "16px 18px", background: C.surface, border: "none",
            borderTop: `1px solid ${C.border}`,
            cursor: "pointer", color: C.blue, fontSize: 13, fontWeight: 500,
            textAlign: "left", transition: "background .15s"
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = C.bg}
          onMouseLeave={(e) => e.currentTarget.style.background = C.surface}>
            <Plus size={15} color={C.blue} strokeWidth={2} />
            <span>Agregar producto</span>
          </button>
        </div>

        {/* Total Display - sutil pero presente */}
        {totalCredits > 0 && (
          <div style={{
            display: "flex", alignItems: "baseline", justifyContent: "space-between",
            padding: "16px 0", borderTop: `1px solid ${C.border}`, marginBottom: 32
          }}>
            <div style={{ fontSize: 13, color: C.text2 }}>Total estimado</div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
              <span style={{
                ...mono, fontSize: isMobile ? 22 : 28, fontWeight: 600, color: C.text,
                letterSpacing: "-.02em"
              }}>{fmt(totalCredits)}</span>
              <span style={{ fontSize: 13, color: C.text2 }}>créditos / año</span>
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════════
             SECCIÓN: Atajos con IA — secundaria, discreta, eficiente
        ═══════════════════════════════════════════════════════════════ */}
        <div style={{
          marginBottom: 14, paddingTop: 24, borderTop: `1px solid ${C.border}`
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
            <Sparkles size={14} color={C.text3} strokeWidth={2} />
            <div style={{
              fontSize: 11, color: C.text3, fontWeight: 600, textTransform: "uppercase",
              letterSpacing: ".06em"
            }}>
              ¿Tienes documentos? Acelera el proceso
            </div>
          </div>
          <p style={{
            fontSize: 13, color: C.text2, margin: "0 0 4px",
            lineHeight: 1.55, maxWidth: 580
          }}>
            Sube tu reporte de consumo de Vision One o tu propuesta anterior. Los analizamos automáticamente y completamos los productos por ti.
          </p>
        </div>

        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: 12,
          marginBottom: 24
        }}>

        {/* ═══════════════════════════════════════════════════════════════
             PANEL: ¿Ya eres cliente Trend Micro? Sube tu consumo actual
        ═══════════════════════════════════════════════════════════════ */}
        <div style={{
          background: C.surface,
          border: `1px solid ${C.border}`,
          borderRadius: 10, padding: isMobile ? 16 : 18, transition: "border-color .15s"
        }}>
          {/* Header */}
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 10, marginBottom: usageItems.length > 0 ? 14 : 0 }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: C.text, marginBottom: 2, display: "flex", alignItems: "center", gap: 8, lineHeight: 1.3 }}>
                <BarChart3 size={15} color={C.text} strokeWidth={2} />
                <span>Reporte de consumo</span>
              </div>
              <div style={{ fontSize: 12.5, color: C.text2, lineHeight: 1.55 }}>
                Sube un screenshot de tu Drawdown mensual y calculamos tu uso anual.
              </div>
            </div>
            {usageItems.length > 0 && (
              <button onClick={clearUsage}
                style={{ padding: "5px 9px", background: "transparent", border: `1px solid ${C.border}`, borderRadius: 6, fontSize: 11, color: C.text2, cursor: "pointer", fontWeight: 500, whiteSpace: "nowrap", display: "flex", alignItems: "center", gap: 4 }}>
                <X size={11} strokeWidth={2.25} />
                <span>Limpiar</span>
              </button>
            )}
          </div>

          {/* Upload area + file list */}
          <div style={{ marginTop:14 }}>
            <input type="file" ref={usageFileRef} accept="image/*" multiple style={{ display:"none" }}
              onChange={e => onUsageFile(e.target.files)} />

            {/* Files list (if any uploaded) */}
            {usageFiles.length > 0 && (
              <div style={{ marginBottom:10 }}>
                <div style={{ fontSize:11, fontWeight:700, color:C.text3, textTransform:"uppercase", letterSpacing:".06em", marginBottom:6 }}>
                  Archivos cargados ({usageFiles.length})
                </div>
                <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
                  {usageFiles.map((f, idx) => (
                    <div key={idx} style={{ display:"flex", alignItems:"center", gap:8, padding:"8px 10px", background:C.surface, border:`1px solid ${C.border}`, borderRadius:7, fontSize:12 }}>
                      <span style={{ fontSize:14 }}>✅</span>
                      <div style={{ flex:1, minWidth:0 }}>
                        <div style={{ fontSize:12, fontWeight:600, color:C.text, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{f.name}</div>
                        <div style={{ fontSize:10, color:C.text3, marginTop:1 }}>
                          {f.productCount} producto{f.productCount !== 1 ? "s" : ""} · {fmt(f.monthlyTotal)} cr/mes{f.monthLabel ? ` · ${f.monthLabel}` : ""}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Upload button (always visible, label changes) */}
            <button onClick={() => usageFileRef.current?.click()} disabled={usageLoading}
              style={{
                width: "100%", padding: "11px 14px",
                background: usageLoading ? C.panel : (usageFiles.length > 0 ? C.surface : C.text),
                color: usageLoading ? C.text2 : (usageFiles.length > 0 ? C.text : "#fff"),
                border: usageFiles.length > 0 ? `1px solid ${C.border}` : "none",
                borderRadius: 8,
                fontSize: 13, fontWeight: 500, cursor: usageLoading ? "wait" : "pointer",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                transition: "background .15s, border-color .15s"
              }}>
              {usageLoading ? (
                <><span style={{ display: "inline-block", width: 12, height: 12, border: `1.5px solid ${C.text3}`, borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.8s linear infinite" }}></span> {usageProgress || "Analizando con IA..."}</>
              ) : usageFiles.length > 0 ? (
                <><Plus size={13} strokeWidth={2.25} /> <span>Agregar otro reporte</span></>
              ) : (
                <><Upload size={13} color="#fff" strokeWidth={2.25} /> <span>Subir reporte de consumo</span></>
              )}
            </button>
            {usageError && (
              <div style={{ marginTop: 10, padding: "9px 11px", background: "#FEE2E2", border: "1px solid #FCA5A5", borderRadius: 6, fontSize: 12, color: "#991B1B", display: "flex", alignItems: "flex-start", gap: 6 }}>
                <AlertTriangle size={12} color="#991B1B" strokeWidth={2} style={{ marginTop: 1, flexShrink: 0 }} />
                <span>{usageError}</span>
              </div>
            )}
            {usageFiles.length === 0 && (
              <div style={{ marginTop: 8, fontSize: 11, color: C.text3, lineHeight: 1.5 }}>
                Puedes subir uno o varios screenshots. Si tienes múltiples cuentas, los productos duplicados se suman automáticamente.
              </div>
            )}
          </div>

          {/* Detected usage table */}
          {usageItems.length > 0 && (
            <>
              <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", background: "#ECFDF5", border: "1px solid #A7F3D0", borderRadius: 8, marginBottom: 12, fontSize: 12, color: "#065F46", lineHeight: 1.5 }}>
                <Sparkles size={13} color="#065F46" strokeWidth={2} style={{ flexShrink: 0 }} />
                <div>
                  <strong style={{ fontWeight: 600 }}>{usageItems.length} producto{usageItems.length === 1 ? "" : "s"}</strong> detectado{usageItems.length === 1 ? "" : "s"} y agregado{usageItems.length === 1 ? "" : "s"} arriba en tu cotización{usageMonth ? ` · ${usageMonth}` : ""}. Las cantidades se estimaron a partir del consumo mensual.
                </div>
              </div>
              <div style={{ fontSize: 11, color: C.text3, marginBottom: 10, lineHeight: 1.5 }}>
                Detalle del consumo mensual original (referencia, no editable):
              </div>

              {/* Items table - desktop */}
              {!isMobile && (
                <div style={{ background:C.surface, borderRadius:8, overflow:"hidden", border:`1px solid ${C.border}` }}>
                  <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13 }}>
                    <thead>
                      <tr style={{ background:C.panel, borderBottom:`1px solid ${C.border}` }}>
                        <th style={{ padding:"10px 12px", textAlign:"left", fontSize:11, fontWeight:700, color:C.text3, textTransform:"uppercase", letterSpacing:".05em" }}>Producto</th>
                        <th style={{ padding:"10px 12px", textAlign:"right", fontSize:11, fontWeight:700, color:C.text3, textTransform:"uppercase", letterSpacing:".05em", width:120 }}>Mensual</th>
                        <th style={{ padding:"10px 12px", textAlign:"right", fontSize:11, fontWeight:700, color:C.text3, textTransform:"uppercase", letterSpacing:".05em", width:120 }}>Anual (×12)</th>
                        <th style={{ padding:"10px 12px", textAlign:"right", fontSize:11, fontWeight:700, color:C.text3, textTransform:"uppercase", letterSpacing:".05em", width:140 }}>≈ Licencias</th>
                        <th style={{ width:40 }}></th>
                      </tr>
                    </thead>
                    <tbody>
                      {usageItems.map(it => {
                        const prod = it.prodId ? CATALOG.find(c => c.id === it.prodId) : null;
                        const annual = (Number(it.monthly) || 0) * 12;
                        const licenses = prod && prod.credits > 0 ? Math.round(annual / prod.credits) : null;
                        const unit = prod ? prod.unit : "";
                        return (
                          <tr key={it.rowId} style={{ borderBottom:`1px solid ${C.border}` }}>
                            <td style={{ padding:"10px 12px" }}>
                              <div style={{ fontSize:13, fontWeight:600, color:C.text }}>
                                {prod ? prod.name : it.nameInScreenshot}
                              </div>
                              {!prod && (
                                <div style={{ fontSize:11, color:"#B45309", marginTop:2 }}>⚠ No matcheado con catálogo</div>
                              )}
                              {prod && it.confidence === "low" && (
                                <div style={{ fontSize:10, color:C.text3, marginTop:2 }}>Detectado: "{it.nameInScreenshot}"</div>
                              )}
                            </td>
                            <td style={{ padding:"6px 12px", textAlign:"right" }}>
                              <input type="number" min="0" value={it.monthly}
                                onChange={e => updateUsageItem(it.rowId, "monthly", Math.max(0, Number(e.target.value) || 0))}
                                style={{ ...mono, width:100, textAlign:"right", padding:"7px 9px", border:`1px solid ${C.border}`, borderRadius:6, fontSize:13, background:C.surface, outline:"none", boxSizing:"border-box" }} />
                            </td>
                            <td style={{ padding:"10px 12px", textAlign:"right", ...mono, fontSize:13, color:C.text, fontWeight:700 }}>
                              {fmt(annual)}
                            </td>
                            <td style={{ padding:"10px 12px", textAlign:"right" }}>
                              {licenses !== null ? (
                                <div>
                                  <div style={{ ...mono, fontSize:14, fontWeight:800, color:C.blue }}>≈ {fmt(licenses)}</div>
                                  <div style={{ fontSize:10, color:C.text3 }}>{unit}{licenses !== 1 ? "s" : ""}</div>
                                </div>
                              ) : (
                                <div style={{ fontSize:11, color:C.text3 }}>—</div>
                              )}
                            </td>
                            <td style={{ padding:"10px 8px", textAlign:"center" }}>
                              <button onClick={() => deleteUsageItem(it.rowId)} title="Eliminar"
                                style={{ width:24, height:24, border:"none", background:"transparent", cursor:"pointer", color:C.text3, fontSize:14 }}>✕</button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                    <tfoot>
                      <tr style={{ background:C.panel }}>
                        <td style={{ padding:"12px", fontSize:12, fontWeight:700, color:C.text, textTransform:"uppercase", letterSpacing:".05em" }}>Totales</td>
                        <td style={{ padding:"12px", textAlign:"right", ...mono, fontSize:14, fontWeight:800, color:C.text }}>{fmt(usageMonthlyTotal)}</td>
                        <td style={{ padding:"12px", textAlign:"right", ...mono, fontSize:16, fontWeight:800, color:C.blue }}>{fmt(usageAnnualTotal)}</td>
                        <td colSpan={2} style={{ padding:"12px", fontSize:11, color:C.text3 }}>cr/año estimados</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              )}

              {/* Items - mobile cards */}
              {isMobile && (
                <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                  {usageItems.map(it => {
                    const prod = it.prodId ? CATALOG.find(c => c.id === it.prodId) : null;
                    const annual = (Number(it.monthly) || 0) * 12;
                    const licenses = prod && prod.credits > 0 ? Math.round(annual / prod.credits) : null;
                    const unit = prod ? prod.unit : "";
                    return (
                      <div key={it.rowId} style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:8, padding:12 }}>
                        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:8, marginBottom:8 }}>
                          <div style={{ flex:1, fontSize:13, fontWeight:700, color:C.text, lineHeight:1.3 }}>
                            {prod ? prod.name : it.nameInScreenshot}
                          </div>
                          <button onClick={() => deleteUsageItem(it.rowId)}
                            style={{ width:24, height:24, border:"none", background:"transparent", cursor:"pointer", color:C.text3, fontSize:14 }}>✕</button>
                        </div>
                        {!prod && (
                          <div style={{ fontSize:11, color:"#B45309", marginBottom:8 }}>⚠ No matcheado con catálogo</div>
                        )}
                        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginBottom:8 }}>
                          <div>
                            <div style={{ fontSize:10, color:C.text3, fontWeight:600, marginBottom:3 }}>Mensual</div>
                            <input type="number" min="0" value={it.monthly}
                              onChange={e => updateUsageItem(it.rowId, "monthly", Math.max(0, Number(e.target.value) || 0))}
                              style={{ ...mono, width:"100%", textAlign:"right", padding:"8px", border:`1px solid ${C.border}`, borderRadius:6, fontSize:13, background:C.surface, outline:"none", boxSizing:"border-box" }} />
                          </div>
                          <div>
                            <div style={{ fontSize:10, color:C.text3, fontWeight:600, marginBottom:3 }}>Anual (×12)</div>
                            <div style={{ ...mono, fontSize:14, fontWeight:700, color:C.text, padding:"8px 0" }}>{fmt(annual)}</div>
                          </div>
                        </div>
                        {licenses !== null && (
                          <div style={{ background:C.blueBg, borderRadius:6, padding:"8px 10px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                            <span style={{ fontSize:11, color:C.text2, fontWeight:600 }}>Licencias estimadas:</span>
                            <span style={{ ...mono, fontSize:14, fontWeight:800, color:C.blue }}>≈ {fmt(licenses)} {unit}{licenses !== 1 ? "s" : ""}</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                  <div style={{ background:C.blue, color:"#fff", borderRadius:8, padding:"12px 14px", display:"flex", justifyContent:"space-between", alignItems:"center", marginTop:4 }}>
                    <div style={{ fontSize:11, fontWeight:700, textTransform:"uppercase", letterSpacing:".05em", color:"#DBEAFE" }}>Total anual estimado</div>
                    <div style={{ ...mono, fontSize:18, fontWeight:800 }}>{fmt(usageAnnualTotal)} cr</div>
                  </div>
                </div>
              )}

              <div style={{ marginTop:12, padding:"10px 12px", background:C.surface, border:`1px solid ${C.border}`, borderRadius:7, fontSize:11, color:C.text2, lineHeight:1.5 }}>
                💡 <strong>Importante:</strong> esta proyección asume que tu consumo mensual se mantiene constante durante 12 meses. Las licencias estimadas son aproximadas según los créditos del catálogo Vision One.
              </div>
            </>
          )}
        </div>

        {/* ═══════════════════════════════════════════════════════════════
             PANEL: Subir propuesta anterior
        ═══════════════════════════════════════════════════════════════ */}
        <div style={{
          background: C.surface,
          border: `1px solid ${C.border}`,
          borderRadius: 10, padding: isMobile ? 16 : 18, transition: "border-color .15s"
        }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 10, marginBottom: hasProposal ? 14 : 0 }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: C.text, marginBottom: 2, display: "flex", alignItems: "center", gap: 8, lineHeight: 1.3 }}>
                <FileText size={15} color={C.text} strokeWidth={2} />
                <span>Propuesta anterior</span>
              </div>
              <div style={{ fontSize: 12.5, color: C.text2, lineHeight: 1.55 }}>
                Sube tu Entitlement Certificate o cotización y comparamos compra vs consumo.
              </div>
            </div>
            {hasProposal && (
              <button onClick={clearProposal}
                style={{ padding: "5px 9px", background: "transparent", border: `1px solid ${C.border}`, borderRadius: 6, fontSize: 11, color: C.text2, cursor: "pointer", fontWeight: 500, whiteSpace: "nowrap", display: "flex", alignItems: "center", gap: 4 }}>
                <X size={11} strokeWidth={2.25} />
                <span>Limpiar</span>
              </button>
            )}
          </div>

          {/* Upload area + file list */}
          <div style={{ marginTop:14 }}>
            <input type="file" ref={proposalFileRef} accept="application/pdf,image/*,text/plain" multiple style={{ display:"none" }}
              onChange={e => onProposalFile(e.target.files)} />

            {/* Files list (if any) */}
            {proposalFiles.length > 0 && (
              <div style={{ marginBottom:10 }}>
                <div style={{ fontSize:11, fontWeight:700, color:C.text3, textTransform:"uppercase", letterSpacing:".06em", marginBottom:6 }}>
                  Propuestas cargadas ({proposalFiles.length})
                </div>
                <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
                  {proposalFiles.map((f, idx) => (
                    <div key={idx} style={{ display:"flex", alignItems:"center", gap:8, padding:"8px 10px", background:C.surface, border:`1px solid ${C.border}`, borderRadius:7, fontSize:12 }}>
                      <span style={{ fontSize:14 }}>✅</span>
                      <div style={{ flex:1, minWidth:0 }}>
                        <div style={{ fontSize:12, fontWeight:600, color:C.text, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{f.name}</div>
                        <div style={{ fontSize:10, color:C.text3, marginTop:1 }}>
                          {f.poolCredits > 0 ? `${fmt(f.poolCredits)} cr` : "—"} · {f.productCount} producto{f.productCount !== 1 ? "s" : ""}{f.period ? ` · ${f.period}` : ""}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <button onClick={() => proposalFileRef.current?.click()} disabled={proposalLoading}
              style={{
                width: "100%", padding: "11px 14px",
                background: proposalLoading ? C.panel : (proposalFiles.length > 0 ? C.surface : C.text),
                color: proposalLoading ? C.text2 : (proposalFiles.length > 0 ? C.text : "#fff"),
                border: proposalFiles.length > 0 ? `1px solid ${C.border}` : "none",
                borderRadius: 8,
                fontSize: 13, fontWeight: 500, cursor: proposalLoading ? "wait" : "pointer",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                transition: "background .15s, border-color .15s"
              }}>
              {proposalLoading ? (
                <><span style={{ display: "inline-block", width: 12, height: 12, border: `1.5px solid ${C.text3}`, borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.8s linear infinite" }}></span> {proposalProgress || "Analizando con IA..."}</>
              ) : proposalFiles.length > 0 ? (
                <><Plus size={13} strokeWidth={2.25} /> <span>Agregar otra propuesta</span></>
              ) : (
                <><Upload size={13} color="#fff" strokeWidth={2.25} /> <span>Subir propuesta o cotización</span></>
              )}
            </button>
            {proposalError && (
              <div style={{ marginTop: 10, padding: "9px 11px", background: "#FEE2E2", border: "1px solid #FCA5A5", borderRadius: 6, fontSize: 12, color: "#991B1B", display: "flex", alignItems: "flex-start", gap: 6 }}>
                <AlertTriangle size={12} color="#991B1B" strokeWidth={2} style={{ marginTop: 1, flexShrink: 0 }} />
                <span>{proposalError}</span>
              </div>
            )}
            {proposalFiles.length === 0 && (
              <div style={{ marginTop: 8, fontSize: 11, color: C.text3, lineHeight: 1.5 }}>
                <strong style={{ color: C.text2, fontWeight: 600 }}>Mejor opción:</strong> Entitlement Certificates oficiales (con SKU, Customer No., Start/End Date). También acepta cotizaciones de partners, screenshots o emails.
              </div>
            )}
          </div>

          {hasProposal && (
            <>
              {proposalItems.length > 0 && (
                <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", background: "#ECFDF5", border: "1px solid #A7F3D0", borderRadius: 8, marginBottom: 12, fontSize: 12, color: "#065F46", lineHeight: 1.5 }}>
                  <Sparkles size={13} color="#065F46" strokeWidth={2} style={{ flexShrink: 0 }} />
                  <div>
                    <strong style={{ fontWeight: 600 }}>{proposalItems.length} producto{proposalItems.length === 1 ? "" : "s"}</strong> del contrato agregado{proposalItems.length === 1 ? "" : "s"} arriba en tu cotización con sus cantidades originales.
                  </div>
                </div>
              )}
              {/* Summary bar */}
              <div style={{ display:"flex", flexWrap:"wrap", gap:isMobile?10:14, marginBottom:14, padding:"12px 14px", background:C.surface, borderRadius:8, border:`1px solid ${C.border}` }}>
                <div style={{ flex:isMobile?"1 1 100%":"none" }}>
                  <div style={{ fontSize:10, color:C.text3, fontWeight:700, textTransform:"uppercase", letterSpacing:".05em" }}>Total comprado</div>
                  <div style={{ ...mono, fontSize:isMobile?20:22, fontWeight:800, color:"#B45309" }}>{fmt(proposalEffectiveTotal)} cr</div>
                  {proposalTotalPool > 0 && proposalComputedTotal > 0 && (
                    <div style={{ fontSize:10, color:C.text3, marginTop:2, ...mono }}>
                      = {fmt(proposalTotalPool)} pool + {fmt(proposalComputedTotal)} productos
                    </div>
                  )}
                </div>
                {proposalPeriod && (
                  <div>
                    <div style={{ fontSize:10, color:C.text3, fontWeight:700, textTransform:"uppercase", letterSpacing:".05em" }}>Periodo</div>
                    <div style={{ fontSize:isMobile?13:14, fontWeight:600, color:C.text }}>{proposalPeriod}</div>
                  </div>
                )}
                {proposalDate && (
                  <div>
                    <div style={{ fontSize:10, color:C.text3, fontWeight:700, textTransform:"uppercase", letterSpacing:".05em" }}>Fecha</div>
                    <div style={{ fontSize:isMobile?13:14, fontWeight:600, color:C.text }}>{proposalDate}</div>
                  </div>
                )}
                <div>
                  <div style={{ fontSize:10, color:C.text3, fontWeight:700, textTransform:"uppercase", letterSpacing:".05em" }}>Productos</div>
                  <div style={{ fontSize:isMobile?13:14, fontWeight:600, color:C.text }}>{proposalItems.length}</div>
                </div>
              </div>

              {/* Editable pool input */}
              <div style={{ marginBottom:14 }}>
                <div style={{ fontSize:11, fontWeight:700, color:C.text3, textTransform:"uppercase", letterSpacing:".05em", marginBottom:6 }}>
                  Pool de créditos sueltos (editable)
                </div>
                <input type="number" min="0" value={proposalTotalPool}
                  onChange={e => setProposalTotalPool(Math.max(0, Number(e.target.value) || 0))}
                  style={{ ...mono, fontSize:16, fontWeight:700, padding:"10px 14px", border:`1.5px solid ${C.border}`, borderRadius:8, background:C.surface, outline:"none", width: isMobile ? "100%" : 240, boxSizing:"border-box" }} />
                <div style={{ fontSize:11, color:C.text3, marginTop:4, lineHeight:1.4 }}>
                  Solo créditos sueltos del Pool (SKU VONN0000, VORN0232, etc). Los productos individuales se muestran abajo.
                </div>
              </div>

              {/* Banner: success — all dates explicit */}
              {allDatesExplicit && (
                <div style={{ marginBottom:14, padding:"12px 14px", background:"#ECFDF5", border:"1px solid #6EE7B7", borderRadius:8, display:"flex", alignItems:"center", gap:10 }}>
                  <span style={{ fontSize:18 }}>✅</span>
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:12, fontWeight:700, color:"#047857", marginBottom:2 }}>
                      Fechas confiables detectadas
                    </div>
                    <div style={{ fontSize:11, color:"#065F46", lineHeight:1.4 }}>
                      Todos los productos provienen de documentos con fechas explícitas (Entitlement Certificates u otros oficiales).
                    </div>
                  </div>
                </div>
              )}

              {/* Banner: warning — items need date confirmation */}
              {itemsNeedingDates.length > 0 && (
                <div style={{ marginBottom:14, padding:"12px 14px", background:"#FEF2F2", border:"1.5px solid #FCA5A5", borderRadius:8, display:"flex", alignItems:"flex-start", gap:10 }}>
                  <span style={{ fontSize:20 }}>⚠️</span>
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:12, fontWeight:700, color:"#991B1B", marginBottom:3 }}>
                      {itemsNeedingDates.length} producto{itemsNeedingDates.length !== 1 ? "s requieren" : " requiere"} confirmación de fechas
                    </div>
                    <div style={{ fontSize:11, color:"#7F1D1D", lineHeight:1.5 }}>
                      Algunos archivos no incluyen fechas explícitas. <strong>Confírmalas manualmente</strong> con el cliente antes de unificar o generar el PDF. Las líneas marcadas en rojo en la tabla.
                    </div>
                  </div>
                </div>
              )}

              {/* Products table - desktop */}
              {proposalItems.length > 0 && !isMobile && (
                <div style={{ background:C.surface, borderRadius:8, overflow:"hidden", border:`1px solid ${C.border}` }}>
                  <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13 }}>
                    <thead>
                      <tr style={{ background:C.panel, borderBottom:`1px solid ${C.border}` }}>
                        <th style={{ padding:"10px 12px", textAlign:"left", fontSize:11, fontWeight:700, color:C.text3, textTransform:"uppercase", letterSpacing:".05em" }}>Producto</th>
                        <th style={{ padding:"10px 12px", textAlign:"right", fontSize:11, fontWeight:700, color:C.text3, textTransform:"uppercase", letterSpacing:".05em", width:110 }}>Comprado</th>
                        <th style={{ padding:"10px 12px", textAlign:"left", fontSize:11, fontWeight:700, color:C.text3, textTransform:"uppercase", letterSpacing:".05em", width:135 }}>Inicio</th>
                        <th style={{ padding:"10px 12px", textAlign:"left", fontSize:11, fontWeight:700, color:C.text3, textTransform:"uppercase", letterSpacing:".05em", width:135 }}>Vencimiento</th>
                        <th style={{ padding:"10px 12px", textAlign:"right", fontSize:11, fontWeight:700, color:C.text3, textTransform:"uppercase", letterSpacing:".05em", width:120 }}>Créditos</th>
                        <th style={{ width:40 }}></th>
                      </tr>
                    </thead>
                    <tbody>
                      {proposalItems.map(it => {
                        const prod = it.prodId ? CATALOG.find(c => c.id === it.prodId) : null;
                        const unit = prod ? prod.unit : (it.unit || "");
                        const needsDates = !it.startDate || !it.endDate || it.datesConfidence === "unknown";
                        const dateInputBorderColor = needsDates ? "#FCA5A5" : C.border;
                        const dateInputBg = needsDates ? "#FEF2F2" : C.surface;
                        return (
                          <tr key={it.rowId} style={{ borderBottom:`1px solid ${C.border}`, background: needsDates ? "#FFFBFB" : "transparent" }}>
                            <td style={{ padding:"10px 12px" }}>
                              <div style={{ fontSize:13, fontWeight:600, color:C.text }}>
                                {prod ? prod.name : it.nameInProposal}
                              </div>
                              {it.sku && (
                                <div style={{ fontSize:10, color:C.blue, fontWeight:600, marginTop:2, ...mono }}>
                                  {it.sku}
                                </div>
                              )}
                              {it.sourceFile && (
                                <div style={{ fontSize:10, color:C.text3, marginTop:2, display:"flex", alignItems:"center", gap:4 }}>
                                  <span>📄</span><span style={{ fontStyle:"italic", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap", maxWidth:200 }}>{it.sourceFile}</span>
                                  {it.sourceType === "entitlement_certificate" && (
                                    <span style={{ background:"#D1FAE5", color:"#065F46", padding:"1px 5px", borderRadius:3, fontSize:9, fontWeight:700 }}>Certificate</span>
                                  )}
                                  {it.datesConfidence === "explicit" && (
                                    <span style={{ color:"#047857", fontSize:11 }} title="Fechas explícitas en documento">✓</span>
                                  )}
                                </div>
                              )}
                              {!prod && (
                                <div style={{ fontSize:11, color:"#B45309", marginTop:2 }}>⚠ No matcheado con catálogo actual</div>
                              )}
                              {needsDates && (
                                <div style={{ fontSize:11, color:"#DC2626", marginTop:3, fontWeight:600 }}>⚠ Confirma las fechas →</div>
                              )}
                              {it.suspiciousQty && (
                                <div style={{ fontSize:11, color:"#DC2626", marginTop:3, fontWeight:600, background:"#FEF2F2", padding:"3px 6px", borderRadius:4, display:"inline-block" }}>⚠ Verifica esta cantidad — coincide con un rango de pricing del nombre</div>
                              )}
                            </td>
                            <td style={{ padding:"6px 12px", textAlign:"right" }}>
                              <input type="number" min="0" value={it.qty}
                                onChange={e => updateProposalItem(it.rowId, "qty", Math.max(0, Number(e.target.value) || 0))}
                                style={{ ...mono, width:80, textAlign:"right", padding:"7px 9px", border:`1px solid ${C.border}`, borderRadius:6, fontSize:13, background:C.surface, outline:"none", boxSizing:"border-box" }} />
                              <div style={{ fontSize:10, color:C.text3, marginTop:2 }}>{unit}{it.qty !== 1 ? "s" : ""}</div>
                            </td>
                            <td style={{ padding:"6px 8px" }}>
                              <input type="date" value={it.startDate || ""}
                                onChange={e => updateProposalItem(it.rowId, "startDate", e.target.value)}
                                style={{ width:120, padding:"7px 8px", border:`1.5px solid ${dateInputBorderColor}`, borderRadius:6, fontSize:11, background:dateInputBg, outline:"none", boxSizing:"border-box", ...mono }} />
                            </td>
                            <td style={{ padding:"6px 8px" }}>
                              <input type="date" value={it.endDate || ""}
                                onChange={e => updateProposalItem(it.rowId, "endDate", e.target.value)}
                                style={{ width:120, padding:"7px 8px", border:`1.5px solid ${dateInputBorderColor}`, borderRadius:6, fontSize:11, background:dateInputBg, outline:"none", boxSizing:"border-box", ...mono }} />
                            </td>
                            <td style={{ padding:"10px 12px", textAlign:"right", ...mono, fontSize:14, fontWeight:700, color:"#B45309" }}>
                              {fmt(it.totalCredits)}
                            </td>
                            <td style={{ padding:"10px 8px", textAlign:"center" }}>
                              <button onClick={() => deleteProposalItem(it.rowId)} title="Eliminar"
                                style={{ width:24, height:24, border:"none", background:"transparent", cursor:"pointer", color:C.text3, fontSize:14 }}>✕</button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Products mobile cards */}
              {proposalItems.length > 0 && isMobile && (
                <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                  {proposalItems.map(it => {
                    const prod = it.prodId ? CATALOG.find(c => c.id === it.prodId) : null;
                    const unit = prod ? prod.unit : (it.unit || "");
                    const needsDates = !it.startDate || !it.endDate || it.datesConfidence === "unknown";
                    const dateInputBorderColor = needsDates ? "#FCA5A5" : C.border;
                    const dateInputBg = needsDates ? "#FEF2F2" : C.surface;
                    return (
                      <div key={it.rowId} style={{ background: needsDates ? "#FFFBFB" : C.surface, border: `${needsDates ? "1.5px solid #FCA5A5" : `1px solid ${C.border}`}`, borderRadius:8, padding:12 }}>
                        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:8, marginBottom:8 }}>
                          <div style={{ flex:1 }}>
                            <div style={{ fontSize:13, fontWeight:700, color:C.text, lineHeight:1.3 }}>
                              {prod ? prod.name : it.nameInProposal}
                            </div>
                            {it.sku && (
                              <div style={{ fontSize:10, color:C.blue, fontWeight:600, marginTop:2, ...mono }}>{it.sku}</div>
                            )}
                            {it.sourceFile && (
                              <div style={{ fontSize:10, color:C.text3, marginTop:3, display:"flex", alignItems:"center", gap:4, flexWrap:"wrap" }}>
                                <span>📄</span>
                                <span style={{ fontStyle:"italic", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap", maxWidth:140 }}>{it.sourceFile}</span>
                                {it.sourceType === "entitlement_certificate" && (
                                  <span style={{ background:"#D1FAE5", color:"#065F46", padding:"1px 5px", borderRadius:3, fontSize:9, fontWeight:700 }}>Certificate</span>
                                )}
                              </div>
                            )}
                            {needsDates && (
                              <div style={{ fontSize:11, color:"#DC2626", marginTop:4, fontWeight:600 }}>⚠ Confirma las fechas</div>
                            )}
                          </div>
                          <button onClick={() => deleteProposalItem(it.rowId)}
                            style={{ width:24, height:24, border:"none", background:"transparent", cursor:"pointer", color:C.text3, fontSize:14 }}>✕</button>
                        </div>
                        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginBottom:8 }}>
                          <div>
                            <div style={{ fontSize:10, color:C.text3, fontWeight:600, marginBottom:3 }}>Comprado ({unit})</div>
                            <input type="number" min="0" value={it.qty}
                              onChange={e => updateProposalItem(it.rowId, "qty", Math.max(0, Number(e.target.value) || 0))}
                              style={{ ...mono, width:"100%", textAlign:"right", padding:"8px", border:`1px solid ${C.border}`, borderRadius:6, fontSize:13, background:C.surface, outline:"none", boxSizing:"border-box" }} />
                          </div>
                          <div>
                            <div style={{ fontSize:10, color:C.text3, fontWeight:600, marginBottom:3 }}>Créditos</div>
                            <div style={{ ...mono, fontSize:14, fontWeight:700, color:"#B45309", padding:"8px 0" }}>{fmt(it.totalCredits)}</div>
                          </div>
                        </div>
                        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
                          <div>
                            <div style={{ fontSize:10, color: needsDates ? "#DC2626" : C.text3, fontWeight:600, marginBottom:3 }}>Inicio {needsDates && "⚠"}</div>
                            <input type="date" value={it.startDate || ""}
                              onChange={e => updateProposalItem(it.rowId, "startDate", e.target.value)}
                              style={{ width:"100%", padding:"8px", border:`1.5px solid ${dateInputBorderColor}`, borderRadius:6, fontSize:11, background:dateInputBg, outline:"none", boxSizing:"border-box", ...mono }} />
                          </div>
                          <div>
                            <div style={{ fontSize:10, color: needsDates ? "#DC2626" : C.text3, fontWeight:600, marginBottom:3 }}>Vencimiento {needsDates && "⚠"}</div>
                            <input type="date" value={it.endDate || ""}
                              onChange={e => updateProposalItem(it.rowId, "endDate", e.target.value)}
                              style={{ width:"100%", padding:"8px", border:`1.5px solid ${dateInputBorderColor}`, borderRadius:6, fontSize:11, background:dateInputBg, outline:"none", boxSizing:"border-box", ...mono }} />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* ═══════════════════════════════════════════════════════
                   UNIFICACIÓN DE FECHAS — visible si hay 2+ líneas
              ═══════════════════════════════════════════════════════ */}
              {proposalItems.length >= 2 && (
                <UnifyDatesPanel
                  items={proposalItems}
                  isMobile={isMobile}
                  open={unifyOpen}
                  setOpen={setUnifyOpen}
                  targetDate={unifyTargetDate}
                  setTargetDate={setUnifyTargetDate}
                  startDate={unifyStartDate}
                  setStartDate={setUnifyStartDate}
                  onApplyToProposal={(targetEnd, sourceStart) => {
                    setProposalItems(prev => prev.map(it => ({
                      ...it,
                      endDate: targetEnd,
                      startDate: sourceStart || it.startDate,
                    })));
                  }}
                  onLoadIntoQuote={(prorated) => {
                    // Add prorated items to the quote (lines)
                    if (!confirm(`¿Cargar ${prorated.length} producto(s) prorrateados en la cotización deseada?\n\nEsto agregará las líneas a tu cotización con las fechas unificadas.`)) return;
                    const newLines = prorated.map((p, idx) => ({
                      rowId: rc + idx,
                      prodId: p.prodId,
                      qty: p.qty,
                      date: p.endDate,
                      startDate: p.startDate,
                    }));
                    setLines(prev => {
                      // Remove empty initial line if exists
                      const filtered = prev.filter(l => l.prodId && l.qty > 0);
                      return [...filtered, ...newLines];
                    });
                    setRc(c => c + prorated.length);
                    setUnifyOpen(false);
                  }}
                />
              )}

              <div style={{ marginTop:12, padding:"10px 12px", background:"#FFFBEB", border:"1px solid #FDE68A", borderRadius:7, fontSize:11, color:"#78350F", lineHeight:1.5 }}>
                💡 <strong>Nota:</strong> cada línea tiene su propia fecha de vencimiento. Las líneas marcadas en rojo tienen fechas vacías que <strong>debes confirmar</strong> manualmente. Los Entitlement Certificates oficiales de Trend Micro siempre traen las fechas explícitas — son la fuente más confiable.
              </div>
            </>
          )}
        </div>

        </div>
        {/* ═══ FIN del grid 2-col de AI panels ═══ */}

        {/* ═══════════════════════════════════════════════════════════════
             ANÁLISIS COMPARATIVO (auto, solo si hay ambos)
        ═══════════════════════════════════════════════════════════════ */}
        {hasComparative && (
          <div style={{
            background: C.text,
            color: "#FFFFFF",
            borderRadius: 12, padding: isMobile ? 18 : 22, marginBottom: 18
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: isMobile ? 14 : 18 }}>
              <TrendingUp size={16} color="#fff" strokeWidth={1.75} />
              <div style={{ fontSize: 11, fontWeight: 600, color: "#fff", textTransform: "uppercase", letterSpacing: ".06em" }}>Análisis comparativo</div>
            </div>

            {/* Big numbers */}
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4, 1fr)", gap: isMobile ? 10 : 14, marginBottom: isMobile ? 14 : 18 }}>
              <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: 8, padding: isMobile ? 12 : 14 }}>
                <div style={{ fontSize: 11, color: C.text4, fontWeight: 500, textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 6 }}>Comprado</div>
                <div style={{ ...mono, fontSize: isMobile ? 22 : 26, fontWeight: 600, color: "#FFFFFF", lineHeight: 1, letterSpacing: "-.015em" }}>{fmt(proposalEffectiveTotal)}</div>
                <div style={{ fontSize: 11, color: C.text4, marginTop: 5 }}>créditos</div>
              </div>
              <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: 8, padding: isMobile ? 12 : 14 }}>
                <div style={{ fontSize: 11, color: C.text4, fontWeight: 500, textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 6 }}>Consumido</div>
                <div style={{ ...mono, fontSize: isMobile ? 22 : 26, fontWeight: 600, color: "#FFFFFF", lineHeight: 1, letterSpacing: "-.015em" }}>{fmt(usageAnnualTotal)}</div>
                <div style={{ fontSize: 11, color: C.text4, marginTop: 5 }}>créditos / año</div>
              </div>
              <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: 8, padding: isMobile ? 12 : 14 }}>
                <div style={{ fontSize: 11, color: C.text4, fontWeight: 500, textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 6 }}>Eficiencia</div>
                <div style={{ ...mono, fontSize: isMobile ? 22 : 26, fontWeight: 600, color: efficiency > 100 ? "#FCA5A5" : "#FFFFFF", lineHeight: 1, letterSpacing: "-.015em" }}>{efficiency.toFixed(1)}%</div>
                <div style={{ fontSize: 11, color: C.text4, marginTop: 5 }}>del pool</div>
              </div>
              <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: 8, padding: isMobile ? 12 : 14 }}>
                <div style={{ fontSize: 11, color: C.text4, fontWeight: 500, textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 6 }}>{efficiency > 100 ? "Déficit" : "Sobrante"}</div>
                <div style={{ ...mono, fontSize: isMobile ? 22 : 26, fontWeight: 600, color: efficiency > 100 ? "#FCA5A5" : "#86EFAC", lineHeight: 1, letterSpacing: "-.015em" }}>
                  {efficiency > 100 ? `+${fmt(deficit)}` : fmt(surplus)}
                </div>
                <div style={{ fontSize: 11, color: C.text4, marginTop: 5 }}>créditos</div>
              </div>
            </div>

            {/* Recommendation */}
            <div style={{ background: "rgba(255,255,255,0.08)", borderRadius: 8, padding: isMobile ? 12 : 14 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
                <Info size={12} color={C.text4} strokeWidth={2} />
                <div style={{ fontSize: 10, color: C.text4, fontWeight: 600, textTransform: "uppercase", letterSpacing: ".06em" }}>Recomendación</div>
              </div>
              {efficiency > 100 ? (
                <div style={{ fontSize: isMobile ? 12 : 13, lineHeight: 1.55, color: "#FFFFFF" }}>
                  <strong style={{ fontWeight: 600 }}>Tu consumo supera lo comprado.</strong> Estás usando {fmt(deficit)} créditos más al año de lo que tu propuesta cubre. Para tu próxima renovación considera contratar <strong style={{ color: "#FEF3C7", fontWeight: 600 }}>{fmt(recommendedAnnual)} créditos</strong> (incluye 10% de buffer para crecimiento).
                </div>
              ) : efficiency < 70 ? (
                <div style={{ fontSize: isMobile ? 12 : 13, lineHeight: 1.55, color: "#FFFFFF" }}>
                  <strong style={{ fontWeight: 600 }}>Estás muy por debajo de tu pool comprado.</strong> Solo usas el {efficiency.toFixed(1)}% de tus créditos. Para tu próxima renovación podrías considerar <strong style={{ color: "#FEF3C7", fontWeight: 600 }}>{fmt(recommendedAnnual)} créditos</strong> (basado en tu consumo + 10% de buffer) y optimizar tu inversión.
                </div>
              ) : (
                <div style={{ fontSize: isMobile ? 12 : 13, lineHeight: 1.55, color: "#FFFFFF" }}>
                  <strong style={{ fontWeight: 600 }}>Tu pool está bien dimensionado</strong> con un sobrante saludable de {fmt(surplus)} créditos. Para tu próxima renovación podrías mantener algo similar o considerar <strong style={{ color: "#FEF3C7", fontWeight: 600 }}>{fmt(recommendedAnnual)} créditos</strong> (consumo + 10% buffer).
                </div>
              )}
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════════
             AUDITORÍA INTELIGENTE — modo cliente (alertas neutras)
             Solo aparece si hay propuesta + consumo
        ═══════════════════════════════════════════════════════════════ */}
        {hasComparative && (() => {
          // proposalEffectiveTotal ya viene calculado correctamente como pool + items
          // (sin doble conteo). Lo pasamos directo al audit como fuente de verdad.
          const audit = auditUsageVsProposal(proposalItems, usageItems, proposalEffectiveTotal);
          return audit.hasFindings ? (
            <AuditPanel audit={audit} isMobile={isMobile} mode="client" />
          ) : null;
        })()}

        {!isMobile && (totalCredits > 0 || hasUsage || hasProposal) && (
          <div style={{
            background: C.text,
            color: "#FFFFFF", borderRadius: 12, padding: 22,
            display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16,
            marginBottom: 18
          }}>
            <div>
              <div style={{ fontSize: 11, color: C.text4, textTransform: "uppercase", letterSpacing: ".08em", fontWeight: 600, marginBottom: 6 }}>
                {totalCredits > 0 ? "Total cotización" : hasComparative ? "Análisis listo" : hasUsage ? "Consumo proyectado" : "Pool comprado"}
              </div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
                <span style={{ ...mono, fontSize: 36, fontWeight: 600, letterSpacing: "-.02em", color: "#FFFFFF" }}>
                  {totalCredits > 0 ? fmt(totalCredits) : hasUsage ? fmt(usageAnnualTotal) : fmt(proposalEffectiveTotal)}
                </span>
                <span style={{ fontSize: 13, color: C.text4 }}>
                  créditos Vision One{totalCredits === 0 && hasUsage ? " / año" : ""}
                </span>
              </div>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={handleDownloadPdf} disabled={pdfLoading}
                style={{ padding: "10px 14px", background: "rgba(255,255,255,0.1)", color: "#fff", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 8, fontSize: 13, fontWeight: 500, cursor: pdfLoading ? "wait" : "pointer", whiteSpace: "nowrap", opacity: pdfLoading ? 0.7 : 1, display: "flex", alignItems: "center", gap: 6 }}>
                {pdfLoading ? (
                  <><span style={{ display: "inline-block", width: 12, height: 12, border: `1.5px solid #fff`, borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.8s linear infinite" }}></span> <span>Generando...</span></>
                ) : (
                  <><Download size={13} color="#fff" strokeWidth={2.25} /> <span>Descargar PDF</span></>
                )}
              </button>
              <button onClick={sendWhatsApp}
                style={{ padding: "10px 14px", background: "#25D366", color: "#fff", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 500, cursor: "pointer", whiteSpace: "nowrap", display: "flex", alignItems: "center", gap: 6 }}>
                <Mail size={13} color="#fff" strokeWidth={2.25} />
                <span>Solicitar cotización</span>
              </button>
            </div>
          </div>
        )}

        <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 10, padding: "14px 18px", fontSize: 12, color: C.text2, lineHeight: 1.6, display: "flex", gap: 10, alignItems: "flex-start" }}>
          <Info size={14} color={C.text2} strokeWidth={1.75} style={{ marginTop: 2, flexShrink: 0 }} />
          <div>
            <strong style={{ color: C.text, fontWeight: 600 }}>¿Qué son los créditos Vision One?</strong> Trend Micro vende su plataforma de seguridad mediante un modelo de créditos prepagados. Cada producto consume una cantidad de créditos según su uso. Esta calculadora te ayuda a estimar tu requerimiento. <strong style={{ color: C.text, fontWeight: 600 }}>Para conocer el precio final</strong>, contacta a Nextcom Systems.
          </div>
        </div>
      </main>

      {isMobile && (totalCredits > 0 || hasUsage || hasProposal) && (
        <div style={{
          position: "fixed", bottom: 0, left: 0, right: 0,
          background: C.text, color: "#FFFFFF",
          padding: "12px 14px calc(12px + env(safe-area-inset-bottom, 0px))",
          borderTop: `1px solid ${C.text}`, zIndex: 90
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, marginBottom: 10 }}>
            <div>
              <div style={{ fontSize: 10, color: C.text4, textTransform: "uppercase", letterSpacing: ".08em", fontWeight: 600 }}>
                {totalCredits > 0 ? "Total cotización" : hasComparative ? "Análisis" : hasUsage ? "Consumo anual" : "Pool comprado"}
              </div>
              <div style={{ ...mono, fontSize: 22, fontWeight: 600, letterSpacing: "-.015em", color: "#FFFFFF" }}>
                {totalCredits > 0 ? fmt(totalCredits) : hasUsage ? fmt(usageAnnualTotal) : fmt(proposalEffectiveTotal)}
              </div>
            </div>
            <div style={{ fontSize: 10, color: C.text4, textAlign: "right", fontWeight: 500 }}>créditos<br />Vision One</div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={handleDownloadPdf} disabled={pdfLoading}
              style={{ flex: 1, padding: "10px", background: "rgba(255,255,255,.1)", color: "#fff", border: "1px solid rgba(255,255,255,.2)", borderRadius: 7, fontSize: 12, fontWeight: 500, cursor: pdfLoading ? "wait" : "pointer", opacity: pdfLoading ? 0.7 : 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 5 }}>
              {pdfLoading ? <span>...</span> : <><Download size={12} color="#fff" strokeWidth={2.25} /> <span>PDF</span></>}
            </button>
            <button onClick={sendWhatsApp}
              style={{ flex: 2, padding: "10px", background: "#25D366", color: "#fff", border: "none", borderRadius: 7, fontSize: 12, fontWeight: 500, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 5 }}>
              <Mail size={12} color="#fff" strokeWidth={2.25} />
              <span>Solicitar cotización</span>
            </button>
          </div>
        </div>
      )}

      {/* ═══ ADVISOR — Asistente de IA Vision One (modo cliente) ═══ */}
      <Advisor
        mode="client"
        isMobile={isMobile}
        getContext={() => ({
          clientName,
          contactName,
          products: lines.filter(l => l.prodId && l.qty > 0).map(l => {
            const p = CATALOG.find(c => c.id === l.prodId);
            return p ? {
              name: p.name,
              qty: l.qty,
              unit: p.unit,
              creditsPerUnit: p.credits,
              totalCredits: Math.round(l.qty * (p.credits || 0)),
              origin: l.origin,
            } : null;
          }).filter(Boolean),
          totalCredits,
          usage: hasUsage ? {
            month: usageMonth,
            monthlyTotal: usageMonthlyTotal,
            annualTotal: usageAnnualTotal,
            items: usageItems.map(it => ({
              name: it.nameInScreenshot || (CATALOG.find(c => c.id === it.prodId)?.name) || "Desconocido",
              monthly: Number(it.monthly) || 0,
            })),
          } : null,
          proposal: hasProposal ? {
            totalPool: proposalEffectiveTotal,
            period: proposalPeriod,
            items: proposalItems.map(it => ({
              name: it.name,
              qty: it.qty,
              totalCredits: it.totalCredits,
            })),
          } : null,
        })}
      />
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════
// UNIFY DATES PANEL — para unificar fechas de vencimiento de propuestas
// ════════════════════════════════════════════════════════════════════════

function UnifyDatesPanel({ items, isMobile, open, setOpen, targetDate, setTargetDate, startDate, setStartDate, onApplyToProposal, onLoadIntoQuote }) {
  // Compute earliest and latest end dates from items
  const dates = items.map(it => it.endDate).filter(d => d);
  const startDates = items.map(it => it.startDate).filter(d => d);
  const earliest = dates.length > 0 ? dates.sort()[0] : "";
  const latest = dates.length > 0 ? dates.sort().reverse()[0] : "";
  const earliestStart = startDates.length > 0 ? startDates.sort()[0] : "";

  // Default target date: latest end date detected
  const effectiveTarget = targetDate || latest;
  const effectiveStart = startDate || new Date().toISOString().split("T")[0];

  // Compute prorated values for preview
  const prorated = items.map(it => {
    const start = effectiveStart;
    const end = effectiveTarget;
    const months = monthsBetween(start, end);
    const proratedQty = it.qty; // we keep qty same, prorate the credits
    const proratedCredits = Math.round(it.qty * (it.creditsPerUnit || 0) * (months / 12));
    return {
      ...it,
      months,
      proratedCredits,
      startDate: start,
      endDate: end,
      qty: it.qty,
    };
  });

  const totalProratedCredits = prorated.reduce((s, p) => s + p.proratedCredits, 0);
  const months = effectiveStart && effectiveTarget ? monthsBetween(effectiveStart, effectiveTarget) : 0;

  if (!open) {
    return (
      <div style={{ marginTop:14 }}>
        <button onClick={() => setOpen(true)}
          style={{
            width:"100%", padding:"12px 16px",
            background: "linear-gradient(135deg, #1E40AF 0%, #1E3A8A 100%)",
            backgroundColor: "#1E40AF",
            color:"#fff", border:"none", borderRadius:9,
            fontSize:14, fontWeight:700, cursor:"pointer",
            display:"flex", alignItems:"center", justifyContent:"center", gap:8
          }}>
          🔄 Unificar fechas de vencimiento
        </button>
        <div style={{ marginTop:6, fontSize:11, color:"#57534E", textAlign:"center", lineHeight:1.4 }}>
          Tienes <strong>{items.length} líneas</strong> con fechas distintas. Unifícalas a una sola fecha de vencimiento y ve los créditos prorrateados.
        </div>
      </div>
    );
  }

  return (
    <div style={{
      marginTop:14, background:"#EFF6FF", border:"2px solid #1E40AF", borderRadius:12, padding: isMobile ? 14 : 18
    }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
        <div style={{ fontSize:isMobile?14:15, fontWeight:800, color:"#1E40AF", display:"flex", alignItems:"center", gap:8 }}>
          🔄 Unificación de fechas de vencimiento
        </div>
        <button onClick={() => setOpen(false)}
          style={{ width:28, height:28, borderRadius:6, border:"1px solid #BFDBFE", background:"#fff", fontSize:12, cursor:"pointer", color:"#1E40AF" }}>
          ✕
        </button>
      </div>

      {/* Date inputs */}
      <div style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap:12, marginBottom:14 }}>
        <div>
          <div style={{ fontSize:11, fontWeight:700, color:"#1E40AF", marginBottom:6, textTransform:"uppercase", letterSpacing:".05em" }}>
            Inicio del prorrateo
          </div>
          <input type="date" value={effectiveStart}
            onChange={e => setStartDate(e.target.value)}
            style={{ ...mono, width:"100%", padding:"10px 12px", border:"1.5px solid #BFDBFE", borderRadius:7, fontSize:13, background:"#fff", outline:"none", boxSizing:"border-box" }} />
          <div style={{ fontSize:10, color:"#57534E", marginTop:4 }}>Por defecto: hoy</div>
        </div>
        <div>
          <div style={{ fontSize:11, fontWeight:700, color:"#1E40AF", marginBottom:6, textTransform:"uppercase", letterSpacing:".05em" }}>
            Fecha objetivo (vencimiento unificado)
          </div>
          <input type="date" value={effectiveTarget}
            onChange={e => setTargetDate(e.target.value)}
            style={{ ...mono, width:"100%", padding:"10px 12px", border:"1.5px solid #BFDBFE", borderRadius:7, fontSize:13, background:"#fff", outline:"none", boxSizing:"border-box" }} />
          <div style={{ display:"flex", gap:6, marginTop:6, flexWrap:"wrap" }}>
            <button onClick={() => setTargetDate(latest)}
              style={{ padding:"4px 10px", fontSize:10, background:"#fff", color:"#1E40AF", border:"1px solid #BFDBFE", borderRadius:5, cursor:"pointer", fontWeight:600 }}>
              📅 Más lejana ({latest || "—"})
            </button>
            <button onClick={() => setTargetDate(earliest)}
              style={{ padding:"4px 10px", fontSize:10, background:"#fff", color:"#1E40AF", border:"1px solid #BFDBFE", borderRadius:5, cursor:"pointer", fontWeight:600 }}>
              📅 Más cercana ({earliest || "—"})
            </button>
          </div>
        </div>
      </div>

      {/* Preview */}
      {months > 0 && (
        <div style={{ background:"#fff", borderRadius:8, padding: isMobile ? 12 : 14, marginBottom:12, border:"1px solid #BFDBFE" }}>
          <div style={{ fontSize:11, fontWeight:700, color:"#1E40AF", marginBottom:8, textTransform:"uppercase", letterSpacing:".05em" }}>
            Vista previa: prorrateo a {months.toFixed(1)} meses
          </div>
          {!isMobile && (
            <table style={{ width:"100%", borderCollapse:"collapse", fontSize:12 }}>
              <thead>
                <tr style={{ borderBottom:"1px solid #E7E5E4" }}>
                  <th style={{ padding:"6px 8px", textAlign:"left", fontSize:10, fontWeight:700, color:"#57534E", textTransform:"uppercase" }}>Producto</th>
                  <th style={{ padding:"6px 8px", textAlign:"right", fontSize:10, fontWeight:700, color:"#57534E", textTransform:"uppercase" }}>Cantidad</th>
                  <th style={{ padding:"6px 8px", textAlign:"right", fontSize:10, fontWeight:700, color:"#57534E", textTransform:"uppercase" }}>Cr/unidad × meses</th>
                  <th style={{ padding:"6px 8px", textAlign:"right", fontSize:10, fontWeight:700, color:"#57534E", textTransform:"uppercase" }}>Cr prorrateados</th>
                </tr>
              </thead>
              <tbody>
                {prorated.map(p => {
                  const prod = p.prodId ? CATALOG.find(c => c.id === p.prodId) : null;
                  return (
                    <tr key={p.rowId} style={{ borderBottom:"1px solid #F5F5F4" }}>
                      <td style={{ padding:"6px 8px", fontSize:11 }}>{prod ? prod.name : (p.nameInProposal || "—")}</td>
                      <td style={{ padding:"6px 8px", textAlign:"right", ...mono, fontSize:11 }}>{fmt(p.qty)}</td>
                      <td style={{ padding:"6px 8px", textAlign:"right", ...mono, fontSize:10, color:"#57534E" }}>
                        {fmt(p.creditsPerUnit || 0)} × {(p.months/12).toFixed(2)} año
                      </td>
                      <td style={{ padding:"6px 8px", textAlign:"right", ...mono, fontSize:13, fontWeight:700, color:"#1E40AF" }}>{fmt(p.proratedCredits)}</td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr style={{ background:"#EFF6FF" }}>
                  <td colSpan={3} style={{ padding:"8px", fontSize:11, fontWeight:700, color:"#1E40AF", textTransform:"uppercase" }}>Total prorrateado</td>
                  <td style={{ padding:"8px", textAlign:"right", ...mono, fontSize:16, fontWeight:800, color:"#1E40AF" }}>{fmt(totalProratedCredits)}</td>
                </tr>
              </tfoot>
            </table>
          )}
          {isMobile && (
            <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
              {prorated.map(p => {
                const prod = p.prodId ? CATALOG.find(c => c.id === p.prodId) : null;
                return (
                  <div key={p.rowId} style={{ borderBottom:"1px solid #F5F5F4", paddingBottom:6 }}>
                    <div style={{ fontSize:11, fontWeight:600 }}>{prod ? prod.name : (p.nameInProposal || "—")}</div>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginTop:3 }}>
                      <span style={{ fontSize:10, color:"#57534E" }}>{fmt(p.qty)} × {fmt(p.creditsPerUnit || 0)} × {(p.months/12).toFixed(2)} año</span>
                      <span style={{ ...mono, fontSize:13, fontWeight:700, color:"#1E40AF" }}>{fmt(p.proratedCredits)}</span>
                    </div>
                  </div>
                );
              })}
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"8px 0", borderTop:"2px solid #1E40AF", marginTop:4 }}>
                <span style={{ fontSize:11, fontWeight:700, color:"#1E40AF", textTransform:"uppercase" }}>Total prorrateado</span>
                <span style={{ ...mono, fontSize:16, fontWeight:800, color:"#1E40AF" }}>{fmt(totalProratedCredits)}</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Action buttons */}
      <div style={{ display:"flex", flexDirection: isMobile ? "column" : "row", gap:8 }}>
        <button onClick={() => onLoadIntoQuote(prorated)}
          disabled={!effectiveTarget || months <= 0}
          style={{
            flex:1, padding:"11px 14px",
            background: (!effectiveTarget || months <= 0) ? "#A8A29E" : "#047857",
            color:"#fff", border:"none", borderRadius:8,
            fontSize:13, fontWeight:700, cursor: (!effectiveTarget || months <= 0) ? "not-allowed" : "pointer"
          }}>
          ✓ Cargar prorrateo en cotización deseada
        </button>
        <button onClick={() => {
          if (confirm("¿Aplicar la fecha objetivo a TODAS las líneas de la propuesta? (esto modifica las fechas pero no cambia las cantidades)")) {
            onApplyToProposal(effectiveTarget, effectiveStart);
          }
        }}
          disabled={!effectiveTarget}
          style={{
            flex:1, padding:"11px 14px",
            background: "#fff", color:"#1E40AF", border:"1.5px solid #1E40AF",
            borderRadius:8, fontSize:13, fontWeight:700, cursor: effectiveTarget ? "pointer" : "not-allowed"
          }}>
          🔄 Solo actualizar fechas en tabla
        </button>
      </div>

      <div style={{ marginTop:10, padding:"8px 12px", background:"rgba(255,255,255,0.6)", borderRadius:6, fontSize:11, color:"#1E3A8A", lineHeight:1.5 }}>
        💡 <strong>Cargar en cotización</strong>: copia los productos prorrateados a tu nueva cotización para que se conviertan en tu próxima compra unificada. <strong>Solo actualizar fechas</strong>: cambia las fechas en la tabla de propuestas sin tocar la cotización.
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════
// AUDIT PANEL — Auditoría inteligente de consumo vs propuesta
// Diseñada para que un cliente NO técnico entienda fácilmente:
//   - Cuántos créditos compró por familia (Endpoint, Email, etc.)
//   - Cuántos está usando realmente
//   - Por qué hay diferencias (sin recomendaciones técnicas)
// ════════════════════════════════════════════════════════════════════════

function AuditPanel({ audit, isMobile, mode = "client", salePricePerCredit = 0, costPricePerCredit = 0 }) {
  if (!audit || !audit.hasFindings) return null;

  const isInternal = mode === "internal";
  const headerColor = isInternal ? "#7C3AED" : "#1E40AF";
  const headerBg = isInternal ? "#FAF5FF" : "#EFF6FF";
  const headerBorder = isInternal ? "#C4B5FD" : "#BFDBFE";

  return (
    <div style={{
      background: headerBg,
      border: `2px solid ${headerBorder}`,
      borderRadius: 14,
      padding: isMobile ? 16 : 22,
      marginBottom: 18,
    }}>
      {/* HEADER */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16, flexWrap: "wrap" }}>
        <span style={{ fontSize: isMobile ? 24 : 28 }}>🔍</span>
        <div style={{ flex: 1, minWidth: 200 }}>
          <div style={{ fontSize: isMobile ? 17 : 19, fontWeight: 800, color: headerColor, letterSpacing: "-.02em" }}>
            {isInternal ? "Auditoría comercial del cliente" : "¿En qué estás usando tus créditos?"}
          </div>
          <div style={{ fontSize: isMobile ? 11 : 13, color: "#57534E", fontWeight: 500, marginTop: 3, lineHeight: 1.4 }}>
            {isInternal
              ? "Análisis del cliente vs lo contratado · oportunidades comerciales"
              : "Comparamos lo que tienes contratado vs el consumo real que detectamos"}
          </div>
        </div>
        {isInternal && (
          <span style={{ background: "#7C3AED", color: "#fff", fontSize: 9, fontWeight: 800, padding: "4px 10px", borderRadius: 5, letterSpacing: ".06em" }}>
            INTERNO · NEXTCOM
          </span>
        )}
      </div>

      {/* INTRO EDUCATIVO — solo para cliente, primera vez */}
      {!isInternal && (
        <div style={{
          background: "#fff", border: `1px solid ${headerBorder}`, borderRadius: 10,
          padding: isMobile ? "12px 14px" : "14px 18px", marginBottom: 16, fontSize: isMobile ? 12 : 13, color: "#0C0A09", lineHeight: 1.55
        }}>
          <div style={{ fontWeight: 700, marginBottom: 4, color: headerColor }}>💡 Cómo funcionan los créditos en Vision One</div>
          <div>
            Trend Vision One usa un sistema de <strong>créditos flexibles</strong>: cada producto cuesta una cantidad fija de créditos por usuario o dispositivo. Por ejemplo, <strong>Endpoint Core</strong> cuesta 45 créditos por endpoint, <strong>Endpoint Pro</strong> cuesta 300 créditos por endpoint. Tu pool total es la suma de todo lo que compraste.
          </div>
        </div>
      )}

      {/* SECCIONES */}
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>

        {/* ═══ ANÁLISIS POR FAMILIA ═══ */}
        {audit.familyAnalysis.map((fa, idx) => {
          const hasGrowth = fa.totalUsedCredits > fa.totalBoughtCredits;
          const hasShrink = fa.totalUsedCredits < fa.totalBoughtCredits * 0.5 && fa.totalBoughtCredits > 0;
          return (
            <div key={`fam-${idx}`} style={{
              background: "#fff", border: `1px solid ${headerBorder}`, borderRadius: 12,
              padding: isMobile ? 14 : 18,
            }}>
              {/* Family header */}
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14, flexWrap: "wrap" }}>
                {(() => {
                  const FamilyIcon = fa.familyKey === "endpoint" ? Shield : fa.familyKey === "email" ? Mail : AlertTriangle;
                  return <FamilyIcon size={18} color={C.text2} strokeWidth={1.75} style={{ flexShrink: 0 }} />;
                })()}
                <div style={{ flex: 1, minWidth: 180 }}>
                  <div style={{ fontSize: isMobile ? 14 : 16, fontWeight: 600, color: "#0C0A09", letterSpacing: "-.005em" }}>{fa.familyName}</div>
                </div>
                {fa.hasTierEscalation && (
                  <span style={{ background: "#FEF3C7", color: "#92400E", fontSize: 10, fontWeight: 600, padding: "3px 9px", borderRadius: 5, display: "flex", alignItems: "center", gap: 4 }}>
                    <AlertTriangle size={11} color="#92400E" strokeWidth={2} />
                    <span>Tier superior detectado</span>
                  </span>
                )}
              </div>

              {/* GRID: Comprado / Usado */}
              <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? 10 : 14 }}>
                {/* COMPRADO */}
                <div style={{ background: "#FAFAF9", border: "1px solid #E7E5E4", borderRadius: 9, padding: isMobile ? 12 : 14 }}>
                  <div style={{ fontSize: 10, color: "#57534E", fontWeight: 600, textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 8, display: "flex", alignItems: "center", gap: 5 }}>
                    <Package size={11} color="#57534E" strokeWidth={2} />
                    <span>Lo que compraste</span>
                  </div>
                  {fa.totalBoughtQty > 0 ? (
                    <>
                      {fa.tiers.map(t => {
                        const b = fa.boughtByTier[t.id];
                        if (b.qty <= 0) return null;
                        return (
                          <div key={t.id} style={{ marginBottom: 6, fontSize: 12, color: "#0C0A09" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                              <span><strong>{Math.round(b.qty).toLocaleString()}</strong> como {t.name}</span>
                              <span style={{ ...mono, fontSize: 12, fontWeight: 700, color: "#B45309" }}>{fmt(b.credits)} cr</span>
                            </div>
                            <div style={{ fontSize: 10, color: "#A8A29E", ...mono, marginTop: 1 }}>
                              {Math.round(b.qty).toLocaleString()} × {t.credits} cr
                            </div>
                          </div>
                        );
                      })}
                      <div style={{ borderTop: "1px solid #E7E5E4", marginTop: 8, paddingTop: 8, display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                        <span style={{ fontSize: 11, fontWeight: 700, color: "#57534E", textTransform: "uppercase", letterSpacing: ".05em" }}>Total comprado</span>
                        <span style={{ ...mono, fontSize: 14, fontWeight: 800, color: "#B45309" }}>{fmt(fa.totalBoughtCredits)} cr</span>
                      </div>
                    </>
                  ) : (
                    <div style={{ fontSize: 12, color: "#A8A29E", fontStyle: "italic" }}>No se compró nada en esta familia</div>
                  )}
                </div>

                {/* USADO */}
                <div style={{ background: "#FAFAF9", border: "1px solid #E7E5E4", borderRadius: 9, padding: isMobile ? 12 : 14 }}>
                  <div style={{ fontSize: 10, color: "#57534E", fontWeight: 600, textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 8, display: "flex", alignItems: "center", gap: 5 }}>
                    <Search size={11} color="#57534E" strokeWidth={2} />
                    <span>Lo que estás usando</span>
                  </div>
                  {fa.totalUsedQty > 0 ? (
                    <>
                      {fa.tiers.map(t => {
                        const u = fa.usedByTier[t.id];
                        if (u.qty <= 0.5) return null; // umbral pequeño para evitar ruido
                        const wasBoughtAtThisTier = fa.boughtByTier[t.id].qty > 0;
                        return (
                          <div key={t.id} style={{ marginBottom: 6, fontSize: 12, color: "#0C0A09" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                              <span>
                                <strong>{Math.round(u.qty).toLocaleString()}</strong> como {t.name}
                                {!wasBoughtAtThisTier && <span style={{ marginLeft: 5, fontSize: 10, color: "#DC2626" }} title="No se compró en este tier">⚠</span>}
                              </span>
                              <span style={{ ...mono, fontSize: 12, fontWeight: 700, color: "#1E40AF" }}>{fmt(u.credits)} cr</span>
                            </div>
                            <div style={{ fontSize: 10, color: "#A8A29E", ...mono, marginTop: 1 }}>
                              {Math.round(u.qty).toLocaleString()} × {t.credits} cr
                            </div>
                          </div>
                        );
                      })}
                      <div style={{ borderTop: "1px solid #E7E5E4", marginTop: 8, paddingTop: 8, display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                        <span style={{ fontSize: 11, fontWeight: 700, color: "#57534E", textTransform: "uppercase", letterSpacing: ".05em" }}>Total usando</span>
                        <span style={{ ...mono, fontSize: 14, fontWeight: 800, color: "#1E40AF" }}>{fmt(fa.totalUsedCredits)} cr</span>
                      </div>
                    </>
                  ) : (
                    <div style={{ fontSize: 12, color: "#A8A29E", fontStyle: "italic" }}>No detectamos consumo en esta familia</div>
                  )}
                </div>
              </div>

              {/* DIFERENCIA + EXPLICACIÓN */}
              {fa.totalBoughtCredits > 0 && fa.totalUsedCredits > 0 && Math.abs(fa.diffCredits) > 100 && (
                <div style={{
                  marginTop: 12,
                  background: hasGrowth ? "#FEF2F2" : (hasShrink ? "#F5F5F4" : "#ECFDF5"),
                  border: `1.5px solid ${hasGrowth ? "#FCA5A5" : (hasShrink ? "#D6D3D1" : "#6EE7B7")}`,
                  borderRadius: 9, padding: isMobile ? 12 : 14
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6, flexWrap: "wrap" }}>
                    <span style={{ fontSize: 16 }}>{hasGrowth ? "📈" : hasShrink ? "📉" : "✅"}</span>
                    <span style={{ fontSize: 13, fontWeight: 700, color: hasGrowth ? "#991B1B" : (hasShrink ? "#44403C" : "#065F46") }}>
                      {hasGrowth
                        ? `Estás usando ${fmt(fa.diffCredits)} créditos más de lo comprado`
                        : hasShrink
                        ? `Estás usando solo ${Math.round((fa.totalUsedCredits / fa.totalBoughtCredits) * 100)}% de lo comprado`
                        : `Tu uso es similar a lo comprado`}
                    </span>
                  </div>
                  <div style={{ fontSize: 12, color: hasGrowth ? "#7F1D1D" : (hasShrink ? "#57534E" : "#065F46"), lineHeight: 1.6 }}>
                    {fa.hasTierEscalation && hasGrowth ? (
                      <>
                        Compraste licencias <strong>{fa.highestBoughtTier.name}</strong> ({fa.highestBoughtTier.credits} cr) pero detectamos uso en tier <strong>{fa.highestUsedTier.name}</strong> ({fa.highestUsedTier.credits} cr).
                        {" "}En Vision One, si activas alguna feature avanzada en una licencia básica, esa licencia automáticamente cuenta como tier superior.{" "}
                        <strong>Te recomendamos revisar con tu administrador qué configuración tienen activa.</strong>
                      </>
                    ) : hasGrowth ? (
                      <>
                        Tu consumo de {fa.familyName} excede lo que contrataste. Esto puede deberse a crecimiento de tu organización o activación de funciones adicionales que consumen más créditos.
                      </>
                    ) : hasShrink ? (
                      <>
                        Tienes capacidad disponible en {fa.familyName}. Si tu organización no creció como esperabas o activaste menos funciones, podrías ajustar este licenciamiento en tu próxima renovación.
                      </>
                    ) : null}
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {/* ═══ PRODUCTOS NO CONTEMPLADOS ═══ */}
        {audit.unplannedProducts.length > 0 && (
          <div style={{ background: "#fff", border: `1px solid ${headerBorder}`, borderRadius: 12, padding: isMobile ? 14 : 18 }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 12 }}>
              <span style={{ fontSize: 20 }}>🆕</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: isMobile ? 14 : 16, fontWeight: 800, color: "#0C0A09" }}>
                  Productos en uso que no están en tu propuesta
                </div>
                <div style={{ fontSize: isMobile ? 11 : 12, color: "#57534E", marginTop: 3, lineHeight: 1.5 }}>
                  {isInternal
                    ? "Cliente está consumiendo del pool sobrante. Oportunidad de incluirlos formalmente en próxima renovación."
                    : "Estás usando estos servicios desde tu pool de créditos sueltos. Pueden ser activaciones recientes o features que se habilitaron sin contratación específica."}
                </div>
              </div>
            </div>
            <div style={{ background: "#FAFAF9", borderRadius: 8, overflow: "hidden", border: "1px solid #E7E5E4" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
                <thead>
                  <tr style={{ background: "#F5F5F4" }}>
                    <th style={{ padding: "8px 10px", textAlign: "left", fontSize: 10, fontWeight: 700, color: "#57534E", textTransform: "uppercase" }}>Servicio</th>
                    <th style={{ padding: "8px 10px", textAlign: "left", fontSize: 10, fontWeight: 700, color: "#57534E", textTransform: "uppercase" }}>Estimado</th>
                    <th style={{ padding: "8px 10px", textAlign: "right", fontSize: 10, fontWeight: 700, color: "#57534E", textTransform: "uppercase" }}>Mensual</th>
                    <th style={{ padding: "8px 10px", textAlign: "right", fontSize: 10, fontWeight: 700, color: "#57534E", textTransform: "uppercase" }}>Anual</th>
                  </tr>
                </thead>
                <tbody>
                  {audit.unplannedProducts.map((up, idx) => {
                    // Calcular estimado de licencias/usuarios/recursos
                    const annualPerUnit = up.prod.credits;
                    const estimatedUnits = annualPerUnit > 0
                      ? Math.round(up.annualUsage / annualPerUnit)
                      : 0;
                    const unitLabel = up.prod.unit || "unidad";
                    const showEstimate = estimatedUnits > 0 && annualPerUnit > 0;
                    return (
                      <tr key={`unp-${idx}`} style={{ borderTop: "1px solid #F5F5F4" }}>
                        <td style={{ padding: "8px 10px", fontSize: 11, fontWeight: 600, color: "#0C0A09" }}>{up.prod.name}</td>
                        <td style={{ padding: "8px 10px", fontSize: 11, color: "#57534E" }}>
                          {showEstimate ? (
                            <span><strong style={{ color: "#0C0A09" }}>≈{fmt(estimatedUnits)}</strong> {unitLabel}{estimatedUnits !== 1 ? "s" : ""}</span>
                          ) : (
                            <span style={{ color: "#A8A29E", fontStyle: "italic" }}>—</span>
                          )}
                        </td>
                        <td style={{ padding: "8px 10px", textAlign: "right", ...mono, fontSize: 11 }}>{fmt(up.monthlyUsage)} cr</td>
                        <td style={{ padding: "8px 10px", textAlign: "right", ...mono, fontSize: 12, fontWeight: 700, color: "#1E40AF" }}>{fmt(up.annualUsage)} cr</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div style={{ marginTop: 8, fontSize: 10, color: "#57534E", lineHeight: 1.5, fontStyle: "italic" }}>
              💡 La columna "Estimado" muestra una aproximación de licencias, usuarios o recursos según la unidad de cada producto. Es una referencia para entender el alcance — el consumo real puede variar según uso de features.
            </div>
          </div>
        )}

        {/* ═══ PRODUCTOS NO USADOS ═══ */}
        {audit.unusedProducts.length > 0 && (
          <div style={{ background: "#fff", border: `1px solid ${headerBorder}`, borderRadius: 12, padding: isMobile ? 14 : 18 }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 12 }}>
              <span style={{ fontSize: 20 }}>📦</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: isMobile ? 14 : 16, fontWeight: 800, color: "#0C0A09" }}>
                  Productos contratados sin uso detectado
                </div>
                <div style={{ fontSize: isMobile ? 11 : 12, color: "#57534E", marginTop: 3, lineHeight: 1.5 }}>
                  {isInternal
                    ? "Cliente compró estos productos pero no los está consumiendo. Evaluar para próxima renovación."
                    : "Tienes estas licencias contratadas pero no detectamos consumo. Pueden estar pendientes de activación o ya no usarse."}
                </div>
              </div>
            </div>
            <div style={{ background: "#FAFAF9", borderRadius: 8, overflow: "hidden", border: "1px solid #E7E5E4" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
                <thead>
                  <tr style={{ background: "#F5F5F4" }}>
                    <th style={{ padding: "8px 10px", textAlign: "left", fontSize: 10, fontWeight: 700, color: "#57534E", textTransform: "uppercase" }}>Producto</th>
                    <th style={{ padding: "8px 10px", textAlign: "right", fontSize: 10, fontWeight: 700, color: "#57534E", textTransform: "uppercase" }}>Comprado</th>
                  </tr>
                </thead>
                <tbody>
                  {audit.unusedProducts.map((un, idx) => (
                    <tr key={`unu-${idx}`} style={{ borderTop: "1px solid #F5F5F4" }}>
                      <td style={{ padding: "8px 10px", fontSize: 11, fontWeight: 600, color: "#0C0A09" }}>{un.prod.name}</td>
                      <td style={{ padding: "8px 10px", textAlign: "right", ...mono, fontSize: 12, color: "#57534E" }}>{fmt(un.qtyBought)} {un.prod.unit}{un.qtyBought !== 1 ? "s" : ""}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ═══ DÉFICIT ═══ */}
        {audit.totalDeficit > 0 && (
          <div style={{ background: "#FEF2F2", border: "2px solid #F87171", borderRadius: 12, padding: isMobile ? 14 : 18 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10, flexWrap: "wrap" }}>
              <span style={{ fontSize: 22 }}>🚨</span>
              <div style={{ flex: 1, minWidth: 180 }}>
                <div style={{ fontSize: isMobile ? 14 : 16, fontWeight: 800, color: "#991B1B" }}>
                  Tu uso supera lo que tienes contratado
                </div>
                <div style={{ fontSize: isMobile ? 11 : 12, color: "#7F1D1D", marginTop: 3, lineHeight: 1.55 }}>
                  Detectamos que estás consumiendo más créditos de los disponibles en tu contrato anual.
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ ...mono, fontSize: isMobile ? 18 : 24, fontWeight: 800, color: "#DC2626" }}>+{fmt(audit.totalDeficit)}</div>
                <div style={{ fontSize: 10, color: "#991B1B", fontWeight: 600, marginTop: 2 }}>cr/año en exceso</div>
              </div>
            </div>
            <div style={{ background: "#fff", borderRadius: 8, padding: 12, fontSize: 12, color: "#0C0A09", lineHeight: 1.6 }}>
              <div style={{ fontWeight: 700, color: "#991B1B", marginBottom: 6 }}>💡 ¿Qué significa esto?</div>
              {isInternal ? (
                <>Cliente está consumiendo por encima del pool contratado. El pool se agotará antes del fin del periodo si no se ajusta. <strong>Oportunidad CRÍTICA</strong> de upsell para próxima renovación con un pool ampliado de al menos <strong>{fmt(Math.ceil(audit.totalAnnualUsage * 1.1 / 100) * 100)} créditos</strong> (consumo actual + 10% buffer) para garantizar cobertura completa.</>
              ) : (
                <>Cuando tu consumo supera el pool contratado, el pool se agota antes del fin del periodo. Para la próxima renovación, te recomendamos contratar un pool de aproximadamente <strong>{fmt(Math.ceil(audit.totalAnnualUsage * 1.1 / 100) * 100)} créditos</strong> (tu consumo actual + 10% de margen) para garantizar cobertura completa durante el periodo. <strong>Conversa con tu partner Trend Micro</strong> para revisar opciones.</>
              )}
            </div>
          </div>
        )}

        {/* ═══ SOBRANTE (solo si NO hay déficit) ═══ */}
        {audit.totalUnallocated > 0 && audit.totalDeficit === 0 && (
          <div style={{ background: "#ECFDF5", border: "1.5px solid #6EE7B7", borderRadius: 12, padding: isMobile ? 14 : 18 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10, flexWrap: "wrap" }}>
              <span style={{ fontSize: 20 }}>💰</span>
              <div style={{ flex: 1, minWidth: 180 }}>
                <div style={{ fontSize: isMobile ? 14 : 15, fontWeight: 800, color: "#065F46" }}>
                  Te sobran créditos en tu pool
                </div>
                <div style={{ fontSize: isMobile ? 11 : 12, color: "#047857", marginTop: 2, lineHeight: 1.5 }}>
                  Tienes capacidad sin usar que podrías aprovechar.
                </div>
              </div>
              <div style={{ ...mono, fontSize: isMobile ? 18 : 22, fontWeight: 800, color: "#047857" }}>{fmt(audit.totalUnallocated)} cr</div>
            </div>
            <div style={{ background: "#fff", borderRadius: 7, padding: 12, fontSize: 11, color: "#065F46", lineHeight: 1.55 }}>
              💡 Con esos créditos podrías activar servicios adicionales como Container Security, File Storage Security, Threat Intelligence, Data Security Posture Management o AI Security. {isInternal ? "Considera proponer estos servicios en una conversación comercial." : "Habla con tu partner Trend Micro para evaluar qué te conviene."}
            </div>
          </div>
        )}

      </div>

      {/* FOOTER SUMMARY */}
      <div style={{
        marginTop: 16, paddingTop: 14, borderTop: `1px solid ${headerBorder}`,
        display: "flex", flexWrap: "wrap", gap: 16, fontSize: 12, color: "#57534E", alignItems: "center"
      }}>
        <div>
          <span style={{ fontWeight: 700, color: headerColor }}>Pool comprado:</span>{" "}
          <span style={{ ...mono, fontWeight: 800 }}>{fmt(audit.totalProposalEffective)} cr</span>
        </div>
        <div style={{ width: 1, height: 14, background: headerBorder }}></div>
        <div>
          <span style={{ fontWeight: 700, color: headerColor }}>Consumo proyectado:</span>{" "}
          <span style={{ ...mono, fontWeight: 800 }}>{fmt(audit.totalAnnualUsage)} cr</span>
        </div>
      </div>
    </div>
  );
}



const NEXTCOM_PIN = "Nextcomvzlapty2026";
const PIN_STORAGE_KEY = "nextcom_pin_remembered";

function WelcomeScreen({ onChooseClient, onChooseInternal }) {
  const isMobile = useIsMobile();
  const [internalLoginOpen, setInternalLoginOpen] = useState(false);
  const [internalUser, setInternalUser] = useState("");
  const [internalPassword, setInternalPassword] = useState("");
  const [showInternalPassword, setShowInternalPassword] = useState(false);
  const [internalLoginLoading, setInternalLoginLoading] = useState(false);
  const [internalLoginError, setInternalLoginError] = useState(false);

  const NextcomEmployeeIcon = ({ size = 23, color = "#334155" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" fill="none">
      <path
        d="M4.75 20.25c.55-3.15 3.18-5.35 7.25-5.35s6.7 2.2 7.25 5.35"
        stroke={color}
        strokeWidth="1.9"
        strokeLinecap="round"
      />
      <path
        d="M8.25 11.35c-1.1-.86-1.8-2.2-1.8-3.7A4.62 4.62 0 0 1 11.1 3h1.8a4.62 4.62 0 0 1 4.65 4.65c0 1.5-.7 2.84-1.8 3.7"
        stroke={color}
        strokeWidth="1.9"
        strokeLinecap="round"
      />
      <rect
        x="8.35"
        y="4.85"
        width="7.3"
        height="7.3"
        rx="1.55"
        transform="rotate(45 12 8.5)"
        fill={color}
      />
      <path
        d="M10.3 9.05V7.1c0-.45.37-.82.82-.82h1.76c.45 0 .82.37.82.82v3.18"
        stroke="#FFFFFF"
        strokeWidth="1.28"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
  const TrendAiEliteMark = ({ compact = false }) => (
    <span style={{ display:"inline-flex", alignItems:"center", gap:compact ? 8 : 10, color:"#FFFFFF", lineHeight:1 }}>
      <span style={{
        position:"relative",
        display:"block",
        width:compact ? 38 : 52,
        height:compact ? 30 : 40,
        overflow:"hidden",
        flex:"0 0 auto",
      }}>
        <img
          src={trendAiElitePartnerLogo}
          alt=""
          aria-hidden="true"
          style={{
            position:"absolute",
            left:0,
            top:0,
            height:"100%",
            width:"auto",
            maxWidth:"none",
            objectFit:"contain",
            objectPosition:"left center",
          }}
        />
      </span>
      <span style={{ display:"grid", gap:compact ? 2 : 4 }}>
        <span style={{ display:"flex", alignItems:"baseline", gap:compact ? 7 : 9, whiteSpace:"nowrap" }}>
          <span style={{ fontSize:compact ? 24 : 34, fontWeight:850, letterSpacing:"-.045em" }}>TrendAI</span>
        </span>
        <span style={{ fontSize:compact ? 13 : 17, fontWeight:760, color:"rgba(255,255,255,.82)", letterSpacing:"-.01em" }}>Elite Partner</span>
      </span>
    </span>
  );

  const submitInternalLogin = (event) => {
    event.preventDefault();
    if (internalLoginLoading) return;
    setInternalLoginLoading(true);
    setInternalLoginError(false);

    window.setTimeout(() => {
      const isValidUser = internalUser.trim().length > 0;
      const isValidPassword = internalPassword.trim().toUpperCase() === NEXTCOM_PIN.toUpperCase();
      if (isValidUser && isValidPassword) {
        onChooseInternal();
        return;
      }
      setInternalLoginError(true);
      setInternalLoginLoading(false);
      setInternalPassword("");
    }, 450);
  };

  const accessCards = [
    {
      title: "Cliente",
      description: "Estimar mis créditos Vision One",
      icon: UserRound,
      action: onChooseClient,
      highlighted: true,
    },
    {
      title: "Equipo Nextcom",
      description: "Acceso interno para análisis, PDF y gestión comercial",
      icon: NextcomEmployeeIcon,
      action: () => {
        setInternalLoginOpen(true);
        setInternalLoginError(false);
      },
      highlighted: false,
    },
  ];
  const benefits = [
    { icon: ShieldCheck, label: "Soluciones de ciberseguridad empresarial" },
    { icon: BarChart3, label: "Decisiones basadas en datos y experiencia Nextcom" },
    { icon: UsersRound, label: "Acompañamiento especializado en todo el ciclo" },
  ];
  return (
    <div style={{
      height:isMobile ? "auto" : "100dvh",
      minHeight:isMobile ? "100dvh" : "620px",
      background:"#F7FAFC",
      display:"grid",
      gridTemplateColumns:isMobile ? "1fr" : "minmax(520px, 50%) minmax(520px, 50%)",
      overflow:isMobile ? "visible" : "hidden",
      fontFamily:"system-ui,-apple-system,sans-serif"
    }}>
      <section style={{
        position:"relative",
        overflow:"hidden",
        minHeight:isMobile ? "auto" : "100dvh",
        padding:isMobile ? "30px 24px 36px" : "clamp(48px,7vh,78px) clamp(54px,5vw,74px) clamp(34px,5vh,52px)",
        color:"#fff",
        display:"flex",
        flexDirection:"column",
        justifyContent:"space-between",
        background:"radial-gradient(circle at 82% 46%, rgba(0,132,255,.2), transparent 34%), linear-gradient(145deg,#04172A 0%,#06233D 56%,#073250 100%)",
      }}>
        <div aria-hidden="true" style={{
          position:"absolute",
          inset:0,
          opacity:.22,
          backgroundImage:"radial-gradient(circle at 1px 1px, rgba(80,180,255,.34) 1.2px, transparent 0)",
          backgroundSize:"26px 26px",
          maskImage:"linear-gradient(100deg, rgba(0,0,0,.18), rgba(0,0,0,.75) 70%, transparent)",
        }} />
        <div aria-hidden="true" style={{
          position:"absolute",
          right:isMobile ? -160 : -120,
          top:isMobile ? 130 : 132,
          width:isMobile ? 390 : "min(560px,42vw)",
          height:isMobile ? 390 : "min(560px,42vw)",
          border:"1px solid rgba(0,132,255,.22)",
          borderRadius:"50%",
        }} />
        <div aria-hidden="true" style={{
          position:"absolute",
          right:isMobile ? -135 : -88,
          top:isMobile ? 172 : 190,
          width:isMobile ? 330 : "min(470px,35vw)",
          height:isMobile ? 330 : "min(470px,35vw)",
          borderRadius:"50%",
          backgroundImage:"radial-gradient(circle at 1px 1px, rgba(0,132,255,.58) 1.25px, transparent 0)",
          backgroundSize:"9px 9px",
          maskImage:"radial-gradient(circle, rgba(0,0,0,.72), transparent 68%)",
          opacity:.72,
        }} />
        <div aria-hidden="true" style={{
          position:"absolute",
          left:"8%",
          right:"10%",
          bottom:isMobile ? 18 : 54,
          height:1,
          background:"linear-gradient(90deg,transparent,rgba(125,211,252,.26),transparent)",
          transform:"rotate(-8deg)",
        }} />

        <div style={{ position:"relative", zIndex:1 }}>
          <div style={{
            display:"flex",
            alignItems:"center",
            gap:isMobile ? 14 : 26,
            marginBottom:isMobile ? 42 : "clamp(54px,8vh,82px)",
            flexWrap:"wrap",
          }}>
            <img src={NEXTCOM_LOGO_REVERSE} alt="Nextcom Systems" style={{ height:isMobile ? 36 : "clamp(36px,5vh,46px)", width:"auto", maxWidth:isMobile ? 162 : 210, objectFit:"contain" }} />
            <div style={{ width:1, height:isMobile ? 34 : 52, background:"rgba(255,255,255,.34)" }} />
            <TrendAiEliteMark compact={isMobile} />
          </div>

          <div style={{ maxWidth:560 }}>
            <div style={{ fontSize:isMobile ? 46 : "clamp(58px,8.2vh,78px)", lineHeight:1.02, fontWeight:850, letterSpacing:"-.06em", marginBottom:isMobile ? 18 : "clamp(18px,2.6vh,24px)" }}>
              <div>Calculadora</div>
              <div style={{ color:"#1084FF" }}>Vision One</div>
            </div>
            <p style={{
              maxWidth:515,
              fontSize:isMobile ? 16 : "clamp(17px,2.2vh,20px)",
              lineHeight:1.55,
              color:"rgba(241,248,255,.86)",
              margin:0,
            }}>
              Estimación, análisis y documentación técnica para soluciones Trend Vision One.
            </p>
          </div>

          <div style={{
            marginTop:isMobile ? 32 : "clamp(36px,5.8vh,58px)",
            maxWidth:560,
          }}>
            <div style={{ display:"flex", alignItems:"center", gap:18, marginBottom:isMobile ? 18 : 22 }}>
              <div style={{
                fontSize:12,
                fontWeight:780,
                letterSpacing:".2em",
                textTransform:"uppercase",
                color:"rgba(226,242,255,.72)",
                whiteSpace:"nowrap",
              }}>
                Credenciales y alianzas
              </div>
              <div style={{ height:1, flex:1, background:"rgba(226,242,255,.24)" }} />
            </div>
            <div style={{
              display:"flex",
              alignItems:"center",
              gap:isMobile ? 18 : 28,
              flexWrap:"wrap",
            }}>
              <TrendAiEliteMark compact />
              <div style={{ width:1, height:isMobile ? 44 : 70, background:"rgba(226,242,255,.28)" }} />
              <div style={{
                display:"flex",
                alignItems:"center",
                gap:isMobile ? 12 : 14,
                flexWrap:"wrap",
              }}>
                {[{ src:iso9001Logo, alt:"ISO 9001" }, { src:iso27001Logo, alt:"ISO/IEC 27001" }].map((cert) => (
                  <img
                    key={cert.alt}
                    src={cert.src}
                    alt={cert.alt}
                    style={{
                      width:isMobile ? 74 : "clamp(82px,10vh,104px)",
                      height:isMobile ? 74 : "clamp(82px,10vh,104px)",
                      objectFit:"contain",
                      display:"block",
                      opacity:.92,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div style={{ position:"relative", zIndex:1, marginTop:isMobile ? 32 : "clamp(26px,4.2vh,40px)" }}>
          <div style={{
            borderTop:"1px solid rgba(226,242,255,.2)",
            borderBottom:"1px solid rgba(226,242,255,.2)",
            padding:isMobile ? "18px 0" : "clamp(16px,2.4vh,22px) 0",
            display:"grid",
            gap:isMobile ? 13 : "clamp(10px,1.8vh,14px)",
            marginBottom:isMobile ? 28 : "clamp(20px,3.4vh,32px)",
            maxWidth:520,
          }}>
            {benefits.map(({ icon: Icon, label }) => (
              <div key={label} style={{
                display:"flex",
                alignItems:"center",
                gap:12,
                padding:"0 0 0 2px",
              }}>
                <span style={{
                  width:32,
                  height:32,
                  borderRadius:10,
                  display:"inline-flex",
                  alignItems:"center",
                  justifyContent:"center",
                  background:"rgba(125,211,252,.1)",
                  border:"none",
                  flex:"0 0 auto",
                }}>
                  <Icon size={22} color="#1084FF" strokeWidth={1.9} />
                </span>
                <div style={{ fontSize:isMobile ? 14 : "clamp(14px,1.8vh,16px)", fontWeight:520, lineHeight:1.35, color:"rgba(241,248,255,.9)" }}>
                  {label}
                </div>
              </div>
            ))}
          </div>
          <div style={{ fontSize:isMobile ? 11 : "clamp(10.5px,1.45vh,12px)", color:"rgba(226,242,255,.66)", lineHeight:1.55 }}>
            <div>Nextcom Systems, Inc. · Panamá · Venezuela · Estados Unidos</div>
            <div style={{ color:"rgba(226,242,255,.86)", fontWeight:700 }}>www.nextcomsystem.com</div>
          </div>
        </div>
      </section>

      <section style={{
        position:"relative",
        overflow:"hidden",
        minHeight:isMobile ? "auto" : "100dvh",
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        padding:isMobile ? "34px 20px 28px" : "clamp(28px,5vh,46px) 7vw",
        background:"linear-gradient(180deg,#FFFFFF 0%,#F8FAFC 100%)",
      }}>
        <div aria-hidden="true" style={{
          position:"absolute",
          top:-80,
          right:-70,
          width:260,
          height:260,
          opacity:.45,
          backgroundImage:"radial-gradient(circle at 1px 1px, #CBD5E1 1px, transparent 0)",
          backgroundSize:"18px 18px",
          maskImage:"radial-gradient(circle, rgba(0,0,0,.9), transparent 72%)",
        }} />
        <div style={{ width:"100%", maxWidth:internalLoginOpen ? 462 : 540, position:"relative", zIndex:1 }}>
          {!internalLoginOpen ? (
            <>
              <div style={{ marginBottom:isMobile ? 28 : 44 }}>
                <div style={{ fontSize:isMobile ? 30 : 38, lineHeight:1.08, fontWeight:850, color:"#0F172A", letterSpacing:"-.04em", marginBottom:18 }}>
                  Selecciona el tipo de acceso
                </div>
                <p style={{ fontSize:isMobile ? 15 : 19, color:"#1F2A44", lineHeight:1.45, margin:0 }}>
                  Elige cómo deseas continuar.
                </p>
              </div>

              <div style={{ display:"grid", gap:isMobile ? 16 : 24 }}>
                {accessCards.map(({ title, description, icon: Icon, action, highlighted }) => (
                  <button
                    key={title}
                    type="button"
                    onClick={action}
                    style={{
                      width:"100%",
                      minHeight:isMobile ? 104 : 132,
                      padding:isMobile ? "18px 18px" : "24px 28px",
                      borderRadius:10,
                      border:highlighted ? "2px solid #1478FF" : "1px solid #D8DEE8",
                      background:highlighted ? "linear-gradient(180deg,#FFFFFF 0%,#F8FBFF 100%)" : "#FFFFFF",
                      boxShadow:highlighted ? "0 18px 42px rgba(20,120,255,.08), 0 1px 0 rgba(255,255,255,.8) inset" : "0 12px 28px rgba(15,23,42,.035)",
                      display:"flex",
                      alignItems:"center",
                      gap:isMobile ? 16 : 24,
                      textAlign:"left",
                      cursor:"pointer",
                      color:"#0F172A",
                      transition:"transform .16s ease, box-shadow .16s ease, border-color .16s ease",
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.transform = "translateY(-1px)";
                      e.currentTarget.style.boxShadow = highlighted ? "0 22px 44px rgba(37,99,235,.18)" : "0 16px 32px rgba(15,23,42,.08)";
                      e.currentTarget.style.borderColor = highlighted ? "#1D4ED8" : "#CBD5E1";
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = highlighted ? "0 18px 38px rgba(37,99,235,.13), 0 1px 0 rgba(255,255,255,.8) inset" : "0 10px 24px rgba(15,23,42,.045)";
                      e.currentTarget.style.borderColor = highlighted ? "#2563EB" : "#E2E8F0";
                    }}
                  >
                    <span style={{
                      width:isMobile ? 58 : 78,
                      height:isMobile ? 58 : 78,
                      borderRadius:"50%",
                      display:"inline-flex",
                      alignItems:"center",
                      justifyContent:"center",
                      flex:"0 0 auto",
                      background:highlighted ? "#EAF2FF" : "#F1F3F6",
                      color:highlighted ? "#1D4ED8" : "#334155",
                      border:"none",
                    }}>
                      <Icon size={highlighted ? 34 : 36} color={highlighted ? "#1478FF" : "#0F2C44"} strokeWidth={highlighted ? 1.95 : 2.05} />
                    </span>
                    <span style={{ flex:1, minWidth:0 }}>
                      <span style={{ display:"block", fontSize:isMobile ? 18 : 23, fontWeight:850, letterSpacing:"-.025em", marginBottom:8 }}>
                        {title}
                      </span>
                      <span style={{ display:"block", fontSize:isMobile ? 13 : 15, color:"#1F2A44", lineHeight:1.45 }}>
                        {description}
                      </span>
                    </span>
                    <ArrowRight size={highlighted ? 32 : 30} color={highlighted ? "#1478FF" : "#9AA3B2"} strokeWidth={2.1} />
                  </button>
                ))}
              </div>

              <div style={{ display:"grid", gridTemplateColumns:"1fr auto 1fr", alignItems:"center", gap:18, margin:isMobile ? "30px 0 20px" : "46px 0 26px" }}>
                <div style={{ height:1, background:"#DDE4EF" }} />
                <span style={{
                  width:28,
                  height:28,
                  borderRadius:"50%",
                  display:"inline-flex",
                  alignItems:"center",
                  justifyContent:"center",
                  color:"#9AA3B2",
                }}>
                  <LockKeyhole size={18} strokeWidth={2.1} />
                </span>
                <div style={{ height:1, background:"#DDE4EF" }} />
              </div>

              <div style={{ textAlign:"center", fontSize:isMobile ? 13.5 : 15.5, lineHeight:1.55, color:"#1F2A44" }}>
                <div>El acceso interno requiere credenciales autorizadas.</div>
                <div>Si no tienes acceso, contacta al equipo de Nextcom.</div>
              </div>
            </>
          ) : (
            <form onSubmit={submitInternalLogin}>
              <div style={{ marginBottom:20 }}>
                <button
                  type="button"
                  onClick={() => {
                    setInternalLoginOpen(false);
                    setInternalLoginError(false);
                    setInternalLoginLoading(false);
                    setInternalPassword("");
                  }}
                  style={{
                    display:"inline-flex",
                    alignItems:"center",
                    gap:7,
                    padding:0,
                    border:"none",
                    background:"transparent",
                    color:"#475569",
                    fontSize:13,
                    fontWeight:750,
                    cursor:"pointer",
                  }}
                >
                  <ArrowLeft size={15} strokeWidth={2.2} />
                  Volver a selección de acceso
                </button>
              </div>

              <section style={{
                border:"1px solid #DDE7EF",
                borderRadius:22,
                background:"#FFFFFF",
                boxShadow:"0 24px 60px rgba(15,23,42,.08)",
                overflow:"hidden",
              }}>
                <div style={{
                  display:"flex",
                  alignItems:"flex-start",
                  gap:14,
                padding:isMobile ? "20px 20px 18px" : "26px 28px 22px",
                  background:"linear-gradient(180deg,#F8FAFC 0%,#FFFFFF 100%)",
                  borderBottom:"1px solid #E2E8F0",
                }}>
                  <span style={{
                    width:42,
                    height:42,
                    borderRadius:13,
                    display:"inline-flex",
                    alignItems:"center",
                    justifyContent:"center",
                    background:"#082F49",
                    color:"#E0F2FE",
                    flex:"0 0 auto",
                    boxShadow:"0 10px 22px rgba(8,47,73,.16)",
                  }}>
                    <ShieldCheck size={21} strokeWidth={2.2} />
                  </span>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontSize:isMobile ? 25 : 29, lineHeight:1.12, fontWeight:820, color:"#0F172A", letterSpacing:"-.032em", marginBottom:9 }}>
                      Acceso interno Nextcom
                    </div>
                    <p style={{ fontSize:isMobile ? 13.5 : 14.5, color:"#53627A", lineHeight:1.55, margin:0 }}>
                      Ingresa tus credenciales autorizadas para continuar.
                    </p>
                  </div>
                </div>

                <div style={{ padding:isMobile ? "20px" : "24px 28px 28px" }}>
                  <div style={{
                    display:"flex",
                    alignItems:"center",
                    gap:10,
                    padding:"12px 14px",
                    borderRadius:13,
                    background:"#F8FAFC",
                    border:"1px solid #E2E8F0",
                    marginBottom:18,
                    color:"#475569",
                    fontSize:12.5,
                    lineHeight:1.45,
                  }}>
                    <LockKeyhole size={16} strokeWidth={2.1} />
                    <span>Solo equipo autorizado de Nextcom Systems.</span>
                  </div>

                  <div style={{ display:"grid", gap:16, width:"100%", maxWidth:380, margin:"0 auto", boxSizing:"border-box" }}>
                    <label style={{ display:"grid", gap:7, minWidth:0 }}>
                      <span style={{ fontSize:12, fontWeight:760, color:"#334155", letterSpacing:".01em" }}>Usuario</span>
                      <input
                        type="email"
                        value={internalUser}
                        onChange={e => {
                          setInternalUser(e.target.value);
                          if (internalLoginError) setInternalLoginError(false);
                        }}
                        placeholder="usuario@nextcomsystems.com"
                        autoComplete="username"
                        style={{
                          width:"100%",
                          boxSizing:"border-box",
                          height:46,
                          border:"1px solid #CAD7E3",
                          borderRadius:10,
                          background:"#FDFEFF",
                          padding:"0 14px",
                          fontSize:14,
                          color:"#0F172A",
                          outline:"none",
                          boxShadow:"0 1px 2px rgba(15,23,42,.035)",
                        }}
                      />
                    </label>

                    <label style={{ display:"grid", gap:7, minWidth:0 }}>
                      <span style={{ fontSize:12, fontWeight:760, color:"#334155", letterSpacing:".01em" }}>Contraseña</span>
                      <div style={{ position:"relative", minWidth:0 }}>
                        <input
                          type={showInternalPassword ? "text" : "password"}
                          value={internalPassword}
                          onChange={e => {
                            setInternalPassword(e.target.value);
                            if (internalLoginError) setInternalLoginError(false);
                          }}
                          placeholder="••••••••"
                          autoComplete="current-password"
                          style={{
                            width:"100%",
                            boxSizing:"border-box",
                            height:46,
                            border:"1px solid #CAD7E3",
                            borderRadius:10,
                            background:"#FDFEFF",
                            padding:"0 48px 0 14px",
                            fontSize:14,
                            color:"#0F172A",
                            outline:"none",
                            boxShadow:"0 1px 2px rgba(15,23,42,.035)",
                          }}
                        />
                        <button
                          type="button"
                          aria-label={showInternalPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                          onClick={() => setShowInternalPassword(v => !v)}
                          style={{
                            position:"absolute",
                            right:8,
                            top:6,
                            width:34,
                            height:34,
                            border:"none",
                            borderRadius:10,
                            background:"transparent",
                            color:"#64748B",
                            cursor:"pointer",
                            display:"inline-flex",
                            alignItems:"center",
                            justifyContent:"center",
                          }}
                        >
                          {showInternalPassword ? <EyeOff size={18} strokeWidth={2} /> : <Eye size={18} strokeWidth={2} />}
                        </button>
                      </div>
                    </label>
                  </div>

                  {internalLoginError && (
                    <div style={{ marginTop:14, border:"1px solid #FECACA", background:"#FEF2F2", color:"#B91C1C", borderRadius:12, padding:"10px 12px", fontSize:12.5, fontWeight:650 }}>
                      Credenciales inválidas. Verifica tu usuario y contraseña.
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={internalLoginLoading}
                    style={{
                      width:"100%",
                      maxWidth:380,
                      boxSizing:"border-box",
                      display:"block",
                      height:48,
                      border:"none",
                      borderRadius:10,
                      background:internalLoginLoading ? "#94A3B8" : "#082F49",
                      color:"#FFFFFF",
                      fontSize:14,
                      fontWeight:800,
                      cursor:internalLoginLoading ? "wait" : "pointer",
                      margin:"20px auto 0",
                      boxShadow:"0 14px 28px rgba(8,47,73,.16)",
                    }}
                  >
                    {internalLoginLoading ? "Validando acceso..." : "Ingresar al panel interno"}
                  </button>
                </div>
              </section>
            </form>
          )}

          <div style={{ marginTop:isMobile ? 42 : 70, fontSize:11.5, color:"#94A3B8", lineHeight:1.55 }}>
            <div>© 2025 Nextcom Systems, Inc.</div>
            <div>Todos los derechos reservados.</div>
          </div>
        </div>
      </section>
    </div>
  );
}

function PinModal({ onSuccess, onCancel }) {
  const isMobile = useIsMobile();
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);
  const [remember, setRemember] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => { setTimeout(() => inputRef.current?.focus(), 100); }, []);

  const submit = () => {
    if (pin.trim().toUpperCase() === NEXTCOM_PIN.toUpperCase()) {
      if (remember) {
        try { localStorage.setItem(PIN_STORAGE_KEY, "1"); } catch (e) {}
      }
      onSuccess();
    } else {
      setError(true);
      setPin("");
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  return (
    <div style={{
      position:"fixed", inset:0, zIndex:10000,
      background:"rgba(0,0,0,0.7)", backdropFilter:"blur(4px)",
      display:"flex", alignItems:"center", justifyContent:"center",
      padding: isMobile ? 16 : 20
    }}>
      <div style={{
        background:C.surface, borderRadius:14,
        padding: isMobile ? "26px 22px" : "32px 36px",
        maxWidth:420, width:"100%",
        boxShadow:"0 20px 60px rgba(0,0,0,.4)"
      }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:18 }}>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <div style={{ fontSize:24 }}>🔐</div>
            <div>
              <div style={{ fontSize:16, fontWeight:700, color:C.text }}>Acceso interno Nextcom</div>
              <div style={{ fontSize:11, color:C.text3, marginTop:2 }}>Solo personal autorizado</div>
            </div>
          </div>
          <button onClick={onCancel}
            style={{ width:30, height:30, borderRadius:7, border:`1px solid ${C.border}`, background:C.surface, fontSize:13, cursor:"pointer" }}>✕</button>
        </div>

        <div style={{ marginBottom:14 }}>
          <div style={{ fontSize:11, fontWeight:600, color:C.text3, marginBottom:6, textTransform:"uppercase", letterSpacing:".06em" }}>Clave de acceso</div>
          <input
            ref={inputRef}
            type="password"
            value={pin}
            onChange={e => { setPin(e.target.value); setError(false); }}
            onKeyDown={e => { if (e.key === "Enter") submit(); }}
            placeholder="Ingresa tu clave"
            autoComplete="off"
            style={{
              width:"100%", boxSizing:"border-box",
              fontSize:16, padding:"13px 15px",
              border:`1.5px solid ${error ? C.red : C.border}`, borderRadius:9,
              outline:"none", background:C.bg,
              ...mono, letterSpacing:"0.1em"
            }}
          />
          {error && (
            <div style={{ fontSize:12, color:C.red, marginTop:6, fontWeight:600 }}>
              ⚠ Clave incorrecta. Intenta de nuevo.
            </div>
          )}
        </div>

        <label style={{ display:"flex", alignItems:"center", gap:8, marginBottom:18, cursor:"pointer", userSelect:"none" }}>
          <input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)}
            style={{ width:16, height:16, cursor:"pointer", accentColor:C.blue }} />
          <span style={{ fontSize:13, color:C.text2 }}>Recordar en este dispositivo</span>
        </label>

        <button onClick={submit}
          style={{
            width:"100%", padding:"13px",
            background:C.blue, color:"#fff", border:"none", borderRadius:9,
            fontSize:14, fontWeight:700, cursor:"pointer"
          }}>
          Ingresar →
        </button>

        <div style={{ marginTop:16, padding:"10px 14px", background:C.panel, borderRadius:7, fontSize:11, color:C.text2, lineHeight:1.5 }}>
          💡 ¿No tienes la clave? Contacta a tu coordinador de ventas en Nextcom.
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════
// ROUTER — Welcome → ClientApp OR (PinModal → InternalApp)
// ════════════════════════════════════════════════════════════════════════

export default function App() {
  // Possible modes: "welcome" | "client" | "pin" | "internal"
  const [mode, setMode] = useState(() => {
    // If PIN was previously remembered, skip straight to internal
    try {
      if (localStorage.getItem(PIN_STORAGE_KEY) === "1") {
        return "internal";
      }
    } catch (e) {}
    return "welcome";
  });

  const goWelcome = () => setMode("welcome");
  const goClient = () => setMode("client");
  const goInternal = () => setMode("internal");

  // Render
  if (mode === "welcome") {
    return <WelcomeScreen onChooseClient={goClient} onChooseInternal={goInternal} />;
  }
  if (mode === "client") {
    return (
      <>
        <ClientApp />
        <BackToWelcomeButton onClick={goWelcome} />
      </>
    );
  }
  if (mode === "internal") {
    return (
      <InternalShell
        nextcomLogo={NEXTCOM_LOGO}
        trendLogo={TRENDAI_LOGO}
        onLogout={() => {
        try { localStorage.removeItem(PIN_STORAGE_KEY); } catch (e) {}
        goWelcome();
      }}>
        <InternalApp />
      </InternalShell>
    );
  }
  return null;
}

function BackToWelcomeButton({ onClick }) {
  return (
    <button onClick={onClick} title="Volver a la pantalla de inicio"
      style={{
        position:"fixed", top:12, right:12, zIndex:200,
        padding:"6px 12px", background:"rgba(255,255,255,0.95)", border:`1px solid ${C.border}`,
        borderRadius:7, fontSize:11, color:C.text2, cursor:"pointer", fontWeight:600,
        boxShadow:"0 2px 8px rgba(0,0,0,.1)", display:"flex", alignItems:"center", gap:5
      }}>
      ← Inicio
    </button>
  );
}

function LogoutButton({ onClick }) {
  return (
    <button onClick={onClick} title="Cerrar sesión interna"
      style={{
        position:"fixed", top:12, right:12, zIndex:200,
        padding:"6px 12px", background:"rgba(255,255,255,0.95)", border:`1px solid ${C.border}`,
        borderRadius:7, fontSize:11, color:C.text2, cursor:"pointer", fontWeight:600,
        boxShadow:"0 2px 8px rgba(0,0,0,.1)", display:"flex", alignItems:"center", gap:5
      }}>
      🚪 Cerrar sesión
    </button>
  );
}
