import { MotivaFrontPage } from './app.po';

describe('motiva-front App', () => {
  let page: MotivaFrontPage;

  beforeEach(() => {
    page = new MotivaFrontPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
