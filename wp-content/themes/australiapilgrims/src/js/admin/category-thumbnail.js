/**
 * Category Thumbnail Media Uploader
 */
jQuery(document).ready(function ($) {
  let mediaUploader;

  // Upload button click
  $(document).on("click", "#category-thumbnail-upload", function (e) {
    e.preventDefault();

    // If the uploader object has already been created, reopen the dialog
    if (mediaUploader) {
      mediaUploader.open();
      return;
    }

    // Extend the wp.media object
    mediaUploader = wp.media({
      title: "Choose Category Thumbnail",
      button: {
        text: "Use this image",
      },
      multiple: false,
    });

    // When a file is selected, run a callback
    mediaUploader.on("select", function () {
      const attachment = mediaUploader
        .state()
        .get("selection")
        .first()
        .toJSON();
      $("#category-thumbnail-id").val(attachment.id);
      $("#category-thumbnail-preview").attr("src", attachment.url).show();
      $(".category-thumbnail-remove").show();
    });

    // Open the uploader dialog
    mediaUploader.open();
  });

  // Remove button click
  $(document).on("click", ".category-thumbnail-remove", function (e) {
    e.preventDefault();
    $("#category-thumbnail-id").val("");
    $("#category-thumbnail-preview").attr("src", "").hide();
    $(this).hide();
  });
});
