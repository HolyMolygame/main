const diff = ($new, $old) => {
  const newNodes = [...$new.childNodes];
  const oldNodes = [...$old.childNodes];

  if (oldNodes.length > newNodes.length) {
    for (let i = 0; i < oldNodes.length - newNodes.length; i++) $old.removeChild($old.lastChild);
  }

  newNodes.forEach(($n, i) => {
    const $o = oldNodes[i];

    if ($o === undefined) {
      $old.appendChild($n.cloneNode(true));
      return;
    }

    if ($o.tagName !== $n.tagName) {
      $old.replaceChild($n.cloneNode(true), $o);
      return;
    }

    // textNode:3, commentNode:8
    if ($n.nodeType === 3 || $n.nodeType === 8) {
      if ($n.textContent !== $o.textContent) $old.replaceChild($n.cloneNode(true), $o);
      return;
    }

    const newAttrs = [...$n.attributes];
    const oldAttrs = [...$o.attributes];

    for (const $nAttr of newAttrs) {
      const $sameAttr = oldAttrs.find($oAttr => $oAttr.name === $nAttr.name);

      if ($sameAttr === undefined) {
        $old.replaceChild($n.cloneNode(true), $o);
        return;
      }

      if ($sameAttr.value !== $nAttr.value) $sameAttr.value = $nAttr.value;
    }

    oldAttrs.forEach($oAttr => {
      if (!newAttrs.find($nAttr => $nAttr.name === $oAttr.name)) $o.removeAttribute($oAttr.name);
    });

    // 원래는 프로퍼티를 전부 비교해줘야하지만, 사정상 value, checked만 확인해주겠다.ㅜㅜ
    if ($n.value !== $o.value) {
      $o.value = $n.value;
    }
    if ($n.checked !== $o.checked) {
      $o.checked = $n.checked;
    }

    diff($n, $o);
  });
};

let rootComponent = null;
let $root = null;

const render = (Component, $rootContainer) => {
  if (Component) rootComponent = new Component();
  if ($rootContainer) $root = $rootContainer;
  console.log(rootComponent);
  const $virtual = new DOMParser().parseFromString(rootComponent.domStr(), 'text/html').body;

  diff($virtual, $root);
};

export default render;
