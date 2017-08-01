import { CaveoAppPage } from './app.po';

describe('caveo-app App', () => {
  let page: CaveoAppPage;

  beforeEach(() => {
    page = new CaveoAppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
