<?php

add_filter('comment_form_fields', function ($fields) {
    unset($fields['url']);
    unset($fields['email']);
    $comment_field = $fields['comment'];
    unset($fields['comment']);
    $fields['comment'] = $comment_field;
    return $fields;
});

add_filter('comment_form_submit_button', function ($button) {
    $button = '<input name="submit" type="submit" id="submit" class="btn-primary" value="Send">';

    return $button;
});

add_filter('comment_form_defaults', function ($defaults) {
    $defaults['title_reply'] = 'Share your experience';
    $defaults['title_reply_to'] = 'Replying to %s';

    return $defaults;
});
