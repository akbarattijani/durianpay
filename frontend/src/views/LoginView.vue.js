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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
var LoginViewModel_1 = require("../view-models/LoginViewModel");
var EditField_vue_1 = require("../components/EditField.vue");
var vue_router_1 = require("vue-router");
var viewModel = (0, LoginViewModel_1.useLoginViewModel)();
var router = (0, vue_router_1.useRouter)();
var handleSubmit = function () { return __awaiter(void 0, void 0, void 0, function () {
    var response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, viewModel.handleAuthentication()];
            case 1:
                response = _a.sent();
                if (response) {
                    router.push("/");
                }
                return [2 /*return*/];
        }
    });
}); };
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
var __VLS_ctx = __assign(__assign({}, {}), {});
var __VLS_components;
var __VLS_directives;
/** @type {__VLS_StyleScopedClasses['logo']} */ ;
/** @type {__VLS_StyleScopedClasses['login-box']} */ ;
/** @type {__VLS_StyleScopedClasses['login-box']} */ ;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "login-container" }));
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "login-box" }));
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "logo" }));
__VLS_asFunctionalElement(__VLS_intrinsics.img)({
    src: "../assets/logo_durianpay.png",
    alt: "logo",
});
__VLS_asFunctionalElement(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({});
__VLS_asFunctionalElement(__VLS_intrinsics.form, __VLS_intrinsics.form)(__assign({ onSubmit: (__VLS_ctx.handleSubmit) }));
// @ts-ignore
[handleSubmit,];
/** @type {[typeof EditField, ]} */ ;
// @ts-ignore
var __VLS_0 = __VLS_asFunctionalComponent(EditField_vue_1.default, new EditField_vue_1.default({
    modelValue: (__VLS_ctx.viewModel.email),
    label: "Email",
    placeholder: "Email Anda",
    type: "text",
    required: true,
}));
var __VLS_1 = __VLS_0.apply(void 0, __spreadArray([{
        modelValue: (__VLS_ctx.viewModel.email),
        label: "Email",
        placeholder: "Email Anda",
        type: "text",
        required: true,
    }], __VLS_functionalComponentArgsRest(__VLS_0), false));
// @ts-ignore
[viewModel,];
/** @type {[typeof EditField, ]} */ ;
// @ts-ignore
var __VLS_4 = __VLS_asFunctionalComponent(EditField_vue_1.default, new EditField_vue_1.default({
    modelValue: (__VLS_ctx.viewModel.password),
    label: "Kata sandi",
    placeholder: "Masukkan kata sandi Anda",
    type: "password",
    required: true,
}));
var __VLS_5 = __VLS_4.apply(void 0, __spreadArray([{
        modelValue: (__VLS_ctx.viewModel.password),
        label: "Kata sandi",
        placeholder: "Masukkan kata sandi Anda",
        type: "password",
        required: true,
    }], __VLS_functionalComponentArgsRest(__VLS_4), false));
// @ts-ignore
[viewModel,];
if (__VLS_ctx.viewModel.error) {
    // @ts-ignore
    [viewModel,];
    __VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)(__assign({ class: "error" }));
    (__VLS_ctx.viewModel.error);
    // @ts-ignore
    [viewModel,];
}
__VLS_asFunctionalElement(__VLS_intrinsics.button, __VLS_intrinsics.button)({
    type: "submit",
    disabled: (__VLS_ctx.viewModel.loading),
});
// @ts-ignore
[viewModel,];
(__VLS_ctx.viewModel.loading ? "Memproses..." : "Masuk");
// @ts-ignore
[viewModel,];
/** @type {__VLS_StyleScopedClasses['login-container']} */ ;
/** @type {__VLS_StyleScopedClasses['login-box']} */ ;
/** @type {__VLS_StyleScopedClasses['logo']} */ ;
/** @type {__VLS_StyleScopedClasses['error']} */ ;
var __VLS_export = (await Promise.resolve().then(function () { return require('vue'); })).defineComponent({});
exports.default = {};
