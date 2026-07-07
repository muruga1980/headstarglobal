/* =======================================================
   HEAD STAR GLOBAL — validate.js
   jQuery-powered enquiry form validation + Web3Forms submit.
   Shows a toast on success/error, auto-dismiss after 5s.
   ======================================================= */
(function ($) {
  'use strict';

  var WEB3FORMS_KEY = 'cbc7d883-ef24-431a-849d-cf9cbbf31915';

  var validators = {
    required: function (val) {
      return val.trim().length > 0;
    },
    name: function (val) {
      return /^[a-zA-Z\s.'-]{2,60}$/.test(val.trim());
    },
    email: function (val) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());
    },
    phone: function (val) {
      return /^[0-9+\-\s()]{7,18}$/.test(val.trim());
    },
    minlength: function (val, len) {
      return val.trim().length >= parseInt(len, 10);
    }
  };

  var messages = {
    required: 'This field is required.',
    name: 'Please enter a valid name.',
    email: 'Please enter a valid email address.',
    phone: 'Please enter a valid phone number.',
    minlength: 'Please enter at least {len} characters.'
  };

  function showFieldError($group, msg) {
    $group.addClass('error');
    $group.find('.error-msg').text(msg);
  }

  function clearFieldError($group) {
    $group.removeClass('error');
    $group.find('.error-msg').text('');
  }

  function validateField($field) {
    var $group = $field.closest('.form-group');
    var rules = ($field.data('rules') || '').split('|').filter(Boolean);
    var val = $field.val() || '';

    if (!rules.length) return true;

    for (var i = 0; i < rules.length; i++) {
      var parts = rules[i].split(':');
      var ruleName = parts[0];
      var ruleParam = parts[1];
      var fn = validators[ruleName];
      if (!fn) continue;
      var valid = fn(val, ruleParam);
      if (!valid) {
        var msg = messages[ruleName] || 'Invalid value.';
        if (ruleParam) msg = msg.replace('{len}', ruleParam);
        showFieldError($group, msg);
        return false;
      }
    }
    clearFieldError($group);
    return true;
  }

  function showToast(type, title, msg) {
    var $container = $('#toastContainer');
    if (!$container.length) return;

    var icon = type === 'success' ? 'check_circle' : 'error';
    var borderColor = type === 'success' ? 'var(--primary)' : '#e74c3c';

    var $toast = $(
      '<div class="toast" role="alert" style="border-left-color:' + borderColor + '">' +
        '<div class="toast-icon"><i class="material-icons">' + icon + '</i></div>' +
        '<div class="toast-content"><h6>' + title + '</h6><p>' + msg + '</p></div>' +
        '<button class="toast-close" aria-label="Close notification"><i class="material-icons">close</i></button>' +
      '</div>'
    );

    $container.append($toast);
    requestAnimationFrame(function () {
      setTimeout(function () { $toast.addClass('show'); }, 20);
    });

    var dismissTimer = setTimeout(function () { dismissToast($toast); }, 5000);

    $toast.find('.toast-close').on('click', function () {
      clearTimeout(dismissTimer);
      dismissToast($toast);
    });
  }

  function dismissToast($toast) {
    $toast.removeClass('show');
    setTimeout(function () { $toast.remove(); }, 450);
  }

  $(function () {
    var $form = $('#enquiryForm');
    if (!$form.length) return;

    /* live validation on blur */
    $form.find('[data-rules]').on('blur input', function () {
      validateField($(this));
    });

    $form.on('submit', function (e) {
      e.preventDefault();

      var isValid = true;
      $form.find('[data-rules]').each(function () {
        if (!validateField($(this))) isValid = false;
      });

      if (!isValid) {
        showToast('error', 'Check the form', 'Please correct the highlighted fields and try again.');
        $form.find('.form-group.error').first().find('input, textarea, select').focus();
        return;
      }

      var $btn = $form.find('.form-submit-btn');
      var originalText = $btn.html();
      $btn.prop('disabled', true).html('<i class="material-icons" style="animation:spin 1s linear infinite;">progress_activity</i> Sending...');

      var formData = new FormData($form[0]);
      formData.append('access_key', WEB3FORMS_KEY);

      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' }
      })
        .then(function (res) { return res.json(); })
        .then(function (data) {
          if (data.success) {
            showToast('success', 'Enquiry sent!', 'Thank you — our team will get back to you shortly.');
            $form[0].reset();
            $form.find('.form-group').each(function () { clearFieldError($(this)); });
          } else {
            showToast('error', 'Something went wrong', data.message || 'Please try again in a moment.');
          }
        })
        .catch(function () {
          showToast('error', 'Network error', 'Could not send your enquiry. Please check your connection.');
        })
        .finally(function () {
          $btn.prop('disabled', false).html(originalText);
        });
    });
  });
})(jQuery);
