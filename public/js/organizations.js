(function($) {

  const organizationsList = $('#organizations');
  const header = $('.header');

  $.getJSON('/api/organizations', data => {
    data.length ?
      header.text('Your Organizations') :
      header.text('You have no organizations');
    $.each(data, (index, organization) => {
      organizationsList.append(
        '<li>' +
          organization.name + ' ' +
          '<a class="removeOrg" href="#" data-id=' + organization.id + '>' +
            'remove' +
          '</a>' +
        '</li>'
      );
    });
  });

  organizationsList.on('click', 'a.removeOrg', e => {
    e.preventDefault();
    const orgId = $(e.target).data().id;
    $.ajax({
      url: '/api/organizations/' + orgId,
      type: 'DELETE',
      success: result => {
        $(e.target).parent().remove();
        $.getJSON('/api/organizations', data => {
          data.length ?
            header.text('Your Organizations') :
            header.text('You have no organizations');
        });
      }
    });
  });

})(jQuery);
