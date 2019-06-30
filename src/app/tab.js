const openTab = function(evt, params) {
  var i, tabContent, tabLinks;
  tabContent = document.querySelector('.tabcontent');
  for (i = 0; i < tabContent.length; i++) {
    tabContent[i].style.display = 'none';
  }
  tabLinks = document.querySelector('.tab-links');
  for (i = 0; i < tabLinks.length; i++) {
    tabLinks[i].className = tabLinks[i].className.replace('active', '');
  }
  document.querySelector(params).style.display = 'block';
  evt.currentTarget.className += 'active';
};
module.exports = openTab;
