import type { Directive, DirectiveBinding, VNode } from "vue";

// 数字
function onlyNum(input) {
  input.value = input.value.replace(/\D+/g, "");
}
// 整数(0+正整数)
function onlyInt(input) {
  let value = input.value;
  value = value.replace(/\D+/g, "");
  input.value = value ? Number(value).toString() : value; // 去掉开头多个0
}
// 正整数
function onlyIntp(input) {
  if (!/^[1-9][0-9]*$/.test(input.value)) {
    let value = input.value.replace(/\D+/g, "");
    if (value && value.substring(0, 1) === "0") {
      // 0开头去除0
      value = value.substring(1);
    }

    input.value = value;
  }
}

// 数字+小数点
function onlyNumPoint(input) {
  input.value = input.value.replace(/[^\d.]/g, "");
}

// 浮点型
function onlyFloat(input, n) {
  let value = input.value;
  value = value.replace(/[^\d.]/g, "");
  value = value.replace(/^\./g, "");
  value = value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
  if (n && Number(n) > 0) {
    // 限制n位
    let d = new Array(Number(n)).fill(`\\d`).join("");
    let reg = new RegExp(`^(\\-)*(\\d+)\\.(${d}).*$`, "ig");
    value = value.replace(reg, "$1$2.$3");
  }
  if (value && !value.includes(".")) {
    value = Number(value).toString(); // 去掉开头多个0
  }
  input.value = value;
}
// 字母
function onlyAlp(input) {
  input.value = input.value.replace(/[^A-Za-z]/g, "");
}
// 数字+字母
function onlyNumAlp(input) {
  input.value = input.value.replace(/[^A-Za-z0-9]/g, "");
}

// 四则运算+-*/()数字
function onlyArith(input) {
  let value = input.value;
  if (value) {
    input.value = value.split("").reduce((prev, cur) => {
      if (/^[\d|\-|\+|\*|\/|\.|\(|\)]+$/.test(cur)) {
        return prev + cur;
      }
      return prev;
    }, "");
  }
}

interface VNodeType extends VNode {
  locking?: boolean;
}

const inputFilter: Directive = {
  mounted(el: HTMLInputElement, binding: DirectiveBinding, vnode: VNodeType) {
    const input = el.querySelector(".el-input__inner") || el.querySelector(".el-textarea__inner") || el;
    input.addEventListener("compositionstart", function () {
      vnode.locking = true; // 解决中文输入双向绑定失效
    });
    input.addEventListener("compositionend", function () {
      vnode.locking = false; // 解决中文输入双向绑定失效
      input.dispatchEvent(new Event("input"));
    });
    // 输入监听处理
    input.addEventListener("keyup", function () {
      if (vnode.locking) {
        return;
      }
      // v-inputFilter.num
      if (binding.modifiers.num) {
        // 只能输入数字（开头可以多个0）
        onlyNum(input);
      } else if (binding.modifiers.num_point) {
        // v-inputFilter.num_point 只能输入数字+小数点（可以多个小数点）
        onlyNumPoint(input);
      } else if (binding.modifiers.float) {
        // v-inputFilter.float 只能输入浮点型（只能一个小数点）/ v-inputFilter.float(n) 只能输入浮点型（只能n个小数点）
        onlyFloat(input, binding.value);
      } else if (binding.modifiers.int) {
        //  v-inputFilter.int 只能输入整数（0+正整数）（开头不能多个0）
        onlyInt(input);
      } else if (binding.modifiers.intp) {
        // v-inputFilter.intp 只能输入正整数
        onlyIntp(input);
      } else if (binding.modifiers.alp) {
        // v-inputFilter.alp 只能输入字母
        onlyAlp(input);
      } else if (binding.modifiers.num_alp) {
        // v-inputFilter.num_alp 只能输入数字+字母
        onlyNumAlp(input);
      } else if (binding.modifiers.arith) {
        // v-inputFilter.arith  四则运算符+数字
        onlyArith(input);
      }
      input.dispatchEvent(new Event("input"));
    });
  }
};
export default inputFilter;
