describe('rahul-weather-project', function() {

  beforeEach(function() {
    browser.get('http://127.0.0.1:8080/demo/index.html');
  });

  it('should initialize properly', function() {
    var moduleElement = element.all(by.className('rahul-weather-project'));
    expect(moduleElement.count()).toEqual(1);
  });
});
