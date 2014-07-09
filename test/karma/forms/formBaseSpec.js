describe('The form', function() {
  /* global jQuery: false, CamSDK: false */
  'use strict';
  var $simpleFormDoc;
  var camForm, camNet, procDef;


  it('prepares the testing environemnt', function() {
    runs(function() {
      jQuery.ajax('/base/test/karma/forms/form-simple.html', {
        success: function(data) {
          $simpleFormDoc = jQuery('<div>'+ data +'</div>');
        },
        error: function() {
          console.info('errorThrown', arguments);
        }
      });
    });

    waitsFor(function() {
      return !!$simpleFormDoc;
    }, 400);

    runs(function() {
      expect(typeof CamSDKMocks).toBe('function');

      expect(typeof CamSDK).toBe('function');
    });
  });


  it('needs a process definition', function() {
    runs(function() {
      camNet = new CamSDK({
        apiUri: 'engine-rest/engine',
        HttpClient: CamSDKMocks
      });

      camNet.resource('process-definition').list({}, function(err, result) {
        if (err) {
          throw err;
        }

        procDef = result.items.pop();
      });
    });

    waitsFor(function() {
      return !!procDef;
    }, 4000);

    runs(function() {
      expect(procDef.id).toBeTruthy();
    });
  });


  it('exists globally', function() {
    expect(typeof CamFormSDK).toBe('function');
  });


  it('has a DOM library', function() {
    expect(CamFormSDK.$).toBeTruthy();
  });


  it('initialize', function() {
    expect(typeof CamFormSDK).toBe('function');

    expect(camNet).toBeTruthy();

    expect(function() {
      camForm = new CamFormSDK($simpleFormDoc.find('form[cam-form]'), {
        service: camNet,
        processDefinitionId: procDef.id
      });
    }).not.toThrow();

    expect(camForm.formFieldHandlers instanceof Array).toBe(true);

    expect(camForm.fields instanceof Array).toBe(true);
    var ok;
    runs(function() {
      camForm.initialize(function() {
        ok = true;
      });
    });

    waitsFor("value to be applied to input field", function() {
      return ok;
    });

    runs(function() {
      expect($simpleFormDoc.find('input[type=text]').val())
        .toBeTruthy();
    });
  });


 /** it('harvests variables', function() {
    var result;
    runs(function() {
      camForm.fetchVariables(function(err, result) {

      });
    });

    waitsFor(function() {

    }, 4000);

    runs(function() {

    }); 
  }); */
});
