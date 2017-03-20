import { MorphologicalEngineUiAngularPage } from './app.po';

describe('morphological-engine-ui-angular App', () => {
  let page: MorphologicalEngineUiAngularPage;

  beforeEach(() => {
    page = new MorphologicalEngineUiAngularPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
