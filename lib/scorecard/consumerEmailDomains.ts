/**
 * Free consumer email domains, blocked so the quiz only captures work
 * emails. Not exhaustive — review real submissions after launch and extend
 * this list as new consumer domains slip through.
 */
export const CONSUMER_EMAIL_DOMAINS = [
  // Global majors
  "gmail.com",
  "googlemail.com",
  "yahoo.com",
  "yahoo.co.uk",
  "ymail.com",
  "rocketmail.com",
  "hotmail.com",
  "hotmail.co.uk",
  "outlook.com",
  "live.com",
  "msn.com",
  "icloud.com",
  "me.com",
  "mac.com",
  "aol.com",

  // Privacy-focused
  "protonmail.com",
  "proton.me",
  "tutanota.com",
  "tutanota.de",
  "hushmail.com",
  "fastmail.com",

  // ISP / bundled mail
  "gmx.com",
  "gmx.net",
  "mail.com",
  "comcast.net",
  "verizon.net",
  "att.net",
  "sbcglobal.net",
  "web.de",
  "t-online.de",
  "orange.fr",
  "laposte.net",
  "libero.it",
  "seznam.cz",
  "wp.pl",
  "o2.pl",

  // Russian / Asian majors
  "mail.ru",
  "list.ru",
  "bk.ru",
  "inbox.ru",
  "yandex.com",
  "yandex.ru",
  "qq.com",
  "163.com",
  "126.com",
  "naver.com",
  "daum.net",
  "rediffmail.com",

  // Finnish free mail — relevant to fromto.fi's own market
  "luukku.com",
  "pp.fi",
  "kolumbus.fi",
  "elisanet.fi",
  "saunalahti.fi",
  "dnainternet.net",
] as const;

const CONSUMER_DOMAIN_SET = new Set<string>(CONSUMER_EMAIL_DOMAINS);

export function isWorkEmail(email: string): boolean {
  const domain = email.trim().toLowerCase().split("@")[1];
  if (!domain) return false;
  return !CONSUMER_DOMAIN_SET.has(domain);
}
