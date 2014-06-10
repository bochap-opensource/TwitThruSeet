/**
 * Created by dseet on 6/10/2014.
 */
describe('Midway: Testing Modules', function () {
    describe('App Module:', function () {
        var module;
        beforeEach(function() {
            module = angular.module('demoApiSeet');
        });

        it('should be registered', function () {
            expect(module).not.toBeNull();
        });

        describe("Dependencies:", function() {
            var expectedDeps = ['demoApiSeet.filters', 'demoApiSeet.services', 'demoApiSeet.directives', 'demoApiSeet.interceptors', 'ngRoute'];
            var deps;
            var hasModule = function(m) {
                return deps.indexOf(m) >= 0;
            };

            beforeEach(function() {
                deps = module.value('appName').requires;
            });

            it('should have ' + expectedDeps.length + ' dependencies', function() {
                expect(deps.length).toBe(expectedDeps.length);
            });

            it('should have the following dependencies [' + expectedDeps + ']', function() {
                expect(deps).toEqual(expectedDeps);
            });
        });

    });
});
