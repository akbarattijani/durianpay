"use strict";
/// <reference types="../../node_modules/.vue-global-types/vue_3.5_0.d.ts" />
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var vue_1 = require("vue");
var vue_router_1 = require("vue-router");
var DashboardViewModel_1 = require("../view-models/DashboardViewModel");
var DashboardViewModel_2 = require("../view-models/DashboardViewModel");
var ListView_vue_1 = require("../components/ListView.vue");
var EditField_vue_1 = require("../components/EditField.vue");
var viewModel = (0, DashboardViewModel_2.useDasboardViewModel)();
var router = (0, vue_router_1.useRouter)();
viewModel.page = viewModel.page || 1;
viewModel.sort = null;
viewModel.status = null;
viewModel.role = (0, DashboardViewModel_1.getRole)();
(0, vue_1.onMounted)(function () {
    if (!(0, DashboardViewModel_1.checkAuthentication)()) {
        router.push("/login");
    }
    else {
        viewModel.handleListPayment();
        viewModel.fetchTotalCount();
    }
});
var handleReview = function (item) {
    viewModel.handlePaymentReview(item);
};
var fetchPayments = function () {
    viewModel.page = 1;
    viewModel.handleListPayment();
    viewModel.fetchTotalCount();
};
var handleLogout = function () {
    viewModel.logout();
    router.push("/login");
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
var __VLS_ctx = __assign(__assign({}, {}), {});
var __VLS_components;
var __VLS_directives;
/** @type {__VLS_StyleScopedClasses['pagination']} */ ;
/** @type {__VLS_StyleScopedClasses['pagination']} */ ;
/** @type {__VLS_StyleScopedClasses['pagination']} */ ;
/** @type {__VLS_StyleScopedClasses['logo']} */ ;
/** @type {__VLS_StyleScopedClasses['radio-group']} */ ;
/** @type {__VLS_StyleScopedClasses['shimmer']} */ ;
/** @type {__VLS_StyleScopedClasses['logout-btn']} */ ;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "dashboard" }));
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "top-controls" }));
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "top-bar" }));
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "logo" }));
__VLS_asFunctionalElement(__VLS_intrinsics.img)({
    src: "../assets/logo_durianpay.png",
    alt: "logo",
});
__VLS_asFunctionalElement(__VLS_intrinsics.button, __VLS_intrinsics.button)(__assign({ onClick: (__VLS_ctx.handleLogout) }, { class: "logout-btn" }));
// @ts-ignore
[handleLogout,];
/** @type {[typeof EditField, ]} */ ;
// @ts-ignore
var __VLS_0 = __VLS_asFunctionalComponent(EditField_vue_1.default, new EditField_vue_1.default({
    modelValue: (__VLS_ctx.viewModel.search),
    placeholder: "Search by ID or Name",
    type: "text",
}));
var __VLS_1 = __VLS_0.apply(void 0, __spreadArray([{
        modelValue: (__VLS_ctx.viewModel.search),
        placeholder: "Search by ID or Name",
        type: "text",
    }], __VLS_functionalComponentArgsRest(__VLS_0), false));
// @ts-ignore
[viewModel,];
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "controls" }));
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "status-controls" }));
__VLS_asFunctionalElement(__VLS_intrinsics.label, __VLS_intrinsics.label)({});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "radio-group" }));
__VLS_asFunctionalElement(__VLS_intrinsics.label, __VLS_intrinsics.label)({});
__VLS_asFunctionalElement(__VLS_intrinsics.input)(__assign({ onChange: (__VLS_ctx.fetchPayments) }, { type: "radio", value: "" }));
(__VLS_ctx.viewModel.status);
// @ts-ignore
[viewModel, fetchPayments,];
__VLS_asFunctionalElement(__VLS_intrinsics.label, __VLS_intrinsics.label)({});
__VLS_asFunctionalElement(__VLS_intrinsics.input)(__assign({ onChange: (__VLS_ctx.fetchPayments) }, { type: "radio", value: "completed" }));
(__VLS_ctx.viewModel.status);
// @ts-ignore
[viewModel, fetchPayments,];
__VLS_asFunctionalElement(__VLS_intrinsics.label, __VLS_intrinsics.label)({});
__VLS_asFunctionalElement(__VLS_intrinsics.input)(__assign({ onChange: (__VLS_ctx.fetchPayments) }, { type: "radio", value: "processing" }));
(__VLS_ctx.viewModel.status);
// @ts-ignore
[viewModel, fetchPayments,];
__VLS_asFunctionalElement(__VLS_intrinsics.label, __VLS_intrinsics.label)({});
__VLS_asFunctionalElement(__VLS_intrinsics.input)(__assign({ onChange: (__VLS_ctx.fetchPayments) }, { type: "radio", value: "failed" }));
(__VLS_ctx.viewModel.status);
// @ts-ignore
[viewModel, fetchPayments,];
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "pagination-controls" }));
__VLS_asFunctionalElement(__VLS_intrinsics.label, __VLS_intrinsics.label)({});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "pagination" }));
var _loop_1 = function (page) {
    // @ts-ignore
    [viewModel,];
    __VLS_asFunctionalElement(__VLS_intrinsics.button, __VLS_intrinsics.button)(__assign({ onClick: function () {
            var _a = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                _a[_i] = arguments[_i];
            }
            var $event = _a[0];
            __VLS_ctx.viewModel.goToPage(page);
            // @ts-ignore
            [viewModel,];
        } }, { class: ({ active: __VLS_ctx.viewModel.page === page }) }));
    // @ts-ignore
    [viewModel,];
    (page);
};
for (var _i = 0, _a = __VLS_getVForSourceType((__VLS_ctx.viewModel.totalPagesArray)); _i < _a.length; _i++) {
    var page = _a[_i][0];
    _loop_1(page);
}
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "sort-controls" }));
__VLS_asFunctionalElement(__VLS_intrinsics.label, __VLS_intrinsics.label)({});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "radio-group" }));
__VLS_asFunctionalElement(__VLS_intrinsics.label, __VLS_intrinsics.label)({});
__VLS_asFunctionalElement(__VLS_intrinsics.input)(__assign({ onChange: (__VLS_ctx.fetchPayments) }, { type: "radio", value: "amount_asc" }));
(__VLS_ctx.viewModel.sort);
// @ts-ignore
[viewModel, fetchPayments,];
__VLS_asFunctionalElement(__VLS_intrinsics.label, __VLS_intrinsics.label)({});
__VLS_asFunctionalElement(__VLS_intrinsics.input)(__assign({ onChange: (__VLS_ctx.fetchPayments) }, { type: "radio", value: "amount_desc" }));
(__VLS_ctx.viewModel.sort);
// @ts-ignore
[viewModel, fetchPayments,];
__VLS_asFunctionalElement(__VLS_intrinsics.label, __VLS_intrinsics.label)({});
__VLS_asFunctionalElement(__VLS_intrinsics.input)(__assign({ onChange: (__VLS_ctx.fetchPayments) }, { type: "radio", value: "id_asc" }));
(__VLS_ctx.viewModel.sort);
// @ts-ignore
[viewModel, fetchPayments,];
__VLS_asFunctionalElement(__VLS_intrinsics.label, __VLS_intrinsics.label)({});
__VLS_asFunctionalElement(__VLS_intrinsics.input)(__assign({ onChange: (__VLS_ctx.fetchPayments) }, { type: "radio", value: "id_desc" }));
(__VLS_ctx.viewModel.sort);
// @ts-ignore
[viewModel, fetchPayments,];
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "listview" }));
if (__VLS_ctx.viewModel.loading) {
    // @ts-ignore
    [viewModel,];
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "loading-placeholder" }));
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "shimmer" }));
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "shimmer" }));
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "shimmer" }));
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "shimmer" }));
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "shimmer" }));
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "shimmer" }));
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "shimmer" }));
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "shimmer" }));
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "shimmer" }));
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "shimmer" }));
}
else {
    /** @type {[typeof ListView, ]} */ ;
    // @ts-ignore
    var __VLS_4 = __VLS_asFunctionalComponent(ListView_vue_1.default, new ListView_vue_1.default(__assign({ 'onReview': {} }, { items: (__VLS_ctx.viewModel.filteredPayments), role: (__VLS_ctx.viewModel.role) })));
    var __VLS_5 = __VLS_4.apply(void 0, __spreadArray([__assign({ 'onReview': {} }, { items: (__VLS_ctx.viewModel.filteredPayments), role: (__VLS_ctx.viewModel.role) })], __VLS_functionalComponentArgsRest(__VLS_4), false));
    var __VLS_7 = void 0;
    var __VLS_8 = void 0;
    var __VLS_9 = ({ review: {} },
        { onReview: (__VLS_ctx.handleReview) });
    // @ts-ignore
    [viewModel, viewModel, handleReview,];
    var __VLS_6;
}
/** @type {__VLS_StyleScopedClasses['dashboard']} */ ;
/** @type {__VLS_StyleScopedClasses['top-controls']} */ ;
/** @type {__VLS_StyleScopedClasses['top-bar']} */ ;
/** @type {__VLS_StyleScopedClasses['logo']} */ ;
/** @type {__VLS_StyleScopedClasses['logout-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['controls']} */ ;
/** @type {__VLS_StyleScopedClasses['status-controls']} */ ;
/** @type {__VLS_StyleScopedClasses['radio-group']} */ ;
/** @type {__VLS_StyleScopedClasses['pagination-controls']} */ ;
/** @type {__VLS_StyleScopedClasses['pagination']} */ ;
/** @type {__VLS_StyleScopedClasses['active']} */ ;
/** @type {__VLS_StyleScopedClasses['sort-controls']} */ ;
/** @type {__VLS_StyleScopedClasses['radio-group']} */ ;
/** @type {__VLS_StyleScopedClasses['listview']} */ ;
/** @type {__VLS_StyleScopedClasses['loading-placeholder']} */ ;
/** @type {__VLS_StyleScopedClasses['shimmer']} */ ;
/** @type {__VLS_StyleScopedClasses['shimmer']} */ ;
/** @type {__VLS_StyleScopedClasses['shimmer']} */ ;
/** @type {__VLS_StyleScopedClasses['shimmer']} */ ;
/** @type {__VLS_StyleScopedClasses['shimmer']} */ ;
/** @type {__VLS_StyleScopedClasses['shimmer']} */ ;
/** @type {__VLS_StyleScopedClasses['shimmer']} */ ;
/** @type {__VLS_StyleScopedClasses['shimmer']} */ ;
/** @type {__VLS_StyleScopedClasses['shimmer']} */ ;
/** @type {__VLS_StyleScopedClasses['shimmer']} */ ;
var __VLS_export = (await Promise.resolve().then(function () { return require('vue'); })).defineComponent({});
exports.default = {};
