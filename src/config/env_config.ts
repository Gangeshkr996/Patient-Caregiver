type EnvConfig = {
  baseURL: string;
  webUrl:string;
  privacyUrl:string;
  termsConditions:string;
  faq:string;
  orgId:string;
  appId:string;
  dataCenter:string;
  public:string;
};

type EnvOptions = {
  dev: EnvConfig;
  uat: EnvConfig;
  prod: EnvConfig;
  default: EnvConfig;
};

const selectEnv = (env: keyof EnvOptions): EnvConfig => {
  const envOptions: EnvOptions = {
    dev: {
      baseURL: 'https://dev.api.adli-ad.com/v1/',
      webUrl: 'https://dev.app.adli-ad.com/', 
      privacyUrl:"https://dev.adli-ad.com/privacy/",
      termsConditions:"https://dev.adli-ad.com/terms-and-conditions/",
      faq: "https://dev.adli-ad.com/faqs/",
      orgId: "838132203",
      appId: "edbsneafc60865574d0a60e41f9a615a98da17a1b9882d60d072c571113ecc097869f",
      dataCenter: "US",
      public: "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCQKsghPh9Ct9cNzUMVXITkWG9aKIVKgXMh6AV1zH1yY+SSuSJbydTJKvCDtHtZt4gExeS7x+H38+FtJP6YpTtKq8Wpb5WZVGcIgBUJc7k547N6MVjoctK5T59OcJ+2G5Mm5Uc9YSmymentIxDcDhcBEN16JgFC3APbvtwXTz0xPwIDAQAB",
    },
    uat: {
      baseURL: 'https://adliuat-dot-adli-uat.uw.r.appspot.com/v1/',
      webUrl: 'https://uat.app.adli-ad.com/', 
      privacyUrl:"https://uat.adli-ad.com/privacy/",
      termsConditions:"https://uat.adli-ad.com/terms-and-conditions/",
      faq: "https://uat.adli-ad.com/faqs/",
      orgId: "838132203",
      appId: "edbsn32c1ea2fe92ec3db6e5b03582b1e57a1c8e210eea32dd8960bbb426de33721c1",
      dataCenter: "US",
      public: "MIGeMA0GCSqGSIb3DQEBAQUAA4GMADCBiAKBgHyWOAKxpgpPO4n+FKT4b87mzOrmR+JJ9DoTzUrDfpUS7lIXAmSuqDljVVaWQ3+jzuyOCwGKmgauD8OE1TG90WXjZx5SQKiZV5evoF3Xfs8KuFFaM+RmYVd05B5wsJlPcew0qQgYYVhYlwKS/wDB8c5AsyUxxrZJNcsEe+2tME8jAgMBAAE=",
    },
    prod: {
      baseURL: 'https://adliprod-dot-adli-prod.uw.r.appspot.com/v1/',
      webUrl: 'https://adliprod-dot-adli-prod.uw.r.appspot.com/',
      privacyUrl:"https://adli-ad.com/privacy/",
      termsConditions:"https://adli-ad.com/terms-and-conditions/",
      faq: "https://adli-ad.com/faqs/",
      orgId: "838132203",
      appId: "edbsn060703b96dab45ec4c868d110ff510ed08fb747e7fd42d1c42428df283429638",
      dataCenter: "US",
      public: "LS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS0KTUlJQklqQU5CZ2txaGtpRzl3MEJBUUVGQUFPQ0FROEFNSUlCQ2dLQ0FRRUFvY2sxTmQyc3Awc2FHQVdKNWxsQgphYUZKbmVCVFQ2cUZyaUZpK2JiZkZpOTJXS0N5NFIrdytpNDFtcmpzVTNDZE5jVGQ1WGFhNWJhR3dPbDhRZnpwCjNtZlBkWnVrSmZCc0dPUVdJMlQrUkVCZVk3c01JSkNKdGFvYUtNVGtwTi8xYVJaR0RnVEFkbE55cVVFYU95OVQKb1FBbVhsTFVVWE41Zy9tcG1hY0NOK25KbXM0dk4zZ1ZHaWpiVDJManFSMDRoT3BwNWd6blZBWmVNT2RUaVpVRwpPMUZ4N1NzMDVIdGtNVHp5V0ZKZVNqUitMVHFNOVFWOUZ3YXozY29yWHdiU1NLVGNvSXdZeXBzb0cvVjF2cU5nCjVHNjVKUEZxemg0TmVzUlJPS0lBY3N1SDJydHNsckdZZ2cvNUc4OGdTUFZUMENFaDN1Sm1XWEFOWUJTWlJSeGgKZFFJREFRQUIKLS0tLS1FTkQgUFVCTElDIEtFWS0tLS0tCg=="
    },
    default: {
      baseURL: 'https://adli-dev.wl.r.appspot.com/v1/',
      webUrl: '',
      privacyUrl:"",
      termsConditions:"",
      faq: "",
      orgId: "",
      appId: "",
      dataCenter: "",
      public: ""
    }
  }
  return envOptions[env] || envOptions.default;
};

const envConfig: EnvConfig = selectEnv('dev');

export { envConfig };

