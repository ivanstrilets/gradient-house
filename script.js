// ============================================================
// STATE MANAGEMENT - Управление состоянием приложения
// ============================================================

const AppState = {
  layers: [],
  selectedLayerId: null,
  nextLayerId: 0,

  addLayer(type = "linear-gradient") {
    const layer = {
      id: `layer-${this.nextLayerId++}`,
      type: type,
      angle: 90,
      position: "center",
      radialShape: "circle",
      radialSize: "farthest-corner",
      colorStops: [
        { color: "#667eea", position: 0, opacity: 100, unit: "%" },
        { color: "#764ba2", position: 100, opacity: 100, unit: "%" },
      ],
      blendMode: "normal",
    };
    this.layers.push(layer);
    this.selectedLayerId = layer.id;
    return layer;
  },

  removeLayer(layerId) {
    this.layers = this.layers.filter((l) => l.id !== layerId);
    if (this.selectedLayerId === layerId) {
      this.selectedLayerId = this.layers.length > 0 ? this.layers[0].id : null;
    }
  },

  getLayer(layerId) {
    return this.layers.find((l) => l.id === layerId);
  },

  updateLayer(layerId, updates) {
    const layer = this.getLayer(layerId);
    if (layer) {
      Object.assign(layer, updates);
    }
  },

  moveLayer(layerId, direction) {
    const index = this.layers.findIndex((l) => l.id === layerId);
    if (direction === "up" && index > 0) {
      [this.layers[index], this.layers[index - 1]] = [
        this.layers[index - 1],
        this.layers[index],
      ];
    } else if (direction === "down" && index < this.layers.length - 1) {
      [this.layers[index], this.layers[index + 1]] = [
        this.layers[index + 1],
        this.layers[index],
      ];
    }
  },

  addColorStop(layerId, color = "#ffffff", position = 50) {
    const layer = this.getLayer(layerId);
    if (layer) {
      layer.colorStops.push({ color, position, opacity: 100, unit: "%" });
      layer.colorStops.sort((a, b) => a.position - b.position);
    }
  },

  updateColorStop(layerId, index, color, position, opacity = 100, unit = "%") {
    const layer = this.getLayer(layerId);
    if (layer && layer.colorStops[index]) {
      layer.colorStops[index].color = color;
      layer.colorStops[index].position = position;
      layer.colorStops[index].opacity = opacity;
      layer.colorStops[index].unit = unit;
      layer.colorStops.sort((a, b) => a.position - b.position);
    }
  },

  removeColorStop(layerId, index) {
    const layer = this.getLayer(layerId);
    if (layer && layer.colorStops.length > 2) {
      layer.colorStops.splice(index, 1);
    }
  },
};

// ============================================================
// CSS GENERATION - Генерация CSS кода
// ============================================================

function generateColorStopsCSS(
  colorStops,
  isAngleBased = false,
  isLinear = false
) {
  return colorStops
    .map((stop) => {
      const opacity = stop.opacity !== undefined ? stop.opacity : 100;
      const color = stop.color;
      const unit = isAngleBased ? "deg" : stop.unit || "%";

      // For linear gradients, don't add units for positions 0 and 100
      let positionStr;
      if (isLinear && (stop.position === 0 || stop.position === 100)) {
        positionStr = "";
      } else if (stop.position === 0 && !isAngleBased) {
        positionStr = "0";
      } else {
        positionStr = `${stop.position}${unit}`;
      }

      // Handle transparent color
      if (color === "transparent") {
        return `transparent${positionStr ? " " + positionStr : ""}`;
      }

      // Convert hex to rgba if opacity is not 100
      if (opacity < 100 && !isAngleBased) {
        const rgb = hexToRgb(color);
        const alpha = opacity / 100;
        return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})${
          positionStr ? " " + positionStr : ""
        }`;
      }

      return `${color}${positionStr ? " " + positionStr : ""}`;
    })
    .join(", ");
}

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : { r: 0, g: 0, b: 0 };
}

function generateSingleGradient(layer) {
  const isAngleBased = layer.type.includes("conic") || false;
  const isLinear = layer.type === "linear-gradient";
  const colorStops = generateColorStopsCSS(
    layer.colorStops,
    isAngleBased,
    isLinear
  );
  let gradientCSS = "";

  switch (layer.type) {
    case "linear-gradient":
    case "repeating-linear-gradient":
      gradientCSS = `${layer.type}(${layer.angle}deg, ${colorStops})`;
      break;

    case "radial-gradient":
    case "repeating-radial-gradient":
      const shape = layer.radialShape || "circle";
      const size = layer.radialSize || "farthest-corner";
      gradientCSS = `${layer.type}(${shape} ${size} at ${layer.position}, ${colorStops})`;
      break;

    case "conic-gradient":
    case "repeating-conic-gradient":
      gradientCSS = `${layer.type}(from ${layer.angle}deg at ${layer.position}, ${colorStops})`;
      break;

    default:
      gradientCSS = `linear-gradient(90deg, ${colorStops})`;
  }

  return gradientCSS;
}

function generateGradientCSS(layers) {
  if (layers.length === 0) {
    return "background: white;";
  }

  const gradients = layers.map((layer) => generateSingleGradient(layer));
  const blendModes = layers.map((layer) => layer.blendMode);

  let css = "background:\n  " + gradients.join(",\n  ") + ";\n";
  css += "background-blend-mode: " + blendModes.join(", ") + ";";

  return css;
}

function generateBackgroundStyle(layers) {
  if (layers.length === 0) {
    return "background: white;";
  }

  const gradients = layers.map((layer) => generateSingleGradient(layer));

  // Для превью в браузере
  let backgroundCSS = gradients.join(", ");
  return backgroundCSS;
}

// ============================================================
// POSITION HELPERS - Вспомогательные функции для позиции
// ============================================================

function parsePosition(positionStr) {
  if (!positionStr || positionStr === "center") {
    return { x: 0, y: 0 };
  }

  const parts = positionStr.split(" ");
  let x = 0,
    y = 0;

  if (parts.length >= 1) {
    const xVal = parseInt(parts[0]);
    if (!isNaN(xVal)) {
      x = xVal - 50;
    }
  }

  if (parts.length >= 2) {
    const yVal = parseInt(parts[1]);
    if (!isNaN(yVal)) {
      y = yVal - 50;
    }
  }

  return { x, y };
}

function formatPosition(x, y) {
  const xPercent = 50 + x;
  const yPercent = 50 + y;
  return `${xPercent}% ${yPercent}%`;
}

// ============================================================
// UI RENDERING - Рендеринг интерфейса
// ============================================================

function renderLayersList() {
  const container = document.getElementById("layersList");
  container.innerHTML = "";

  AppState.layers.forEach((layer) => {
    const isActive = layer.id === AppState.selectedLayerId;
    const layerEl = document.createElement("div");
    layerEl.className = `layer-item ${isActive ? "active" : ""}`;
    layerEl.dataset.layerId = layer.id;

    const info = document.createElement("div");
    info.className = "layer-item-info";

    const typeEl = document.createElement("div");
    typeEl.className = "layer-item-type";
    typeEl.textContent = getGradientTypeLabel(layer.type);

    const previewEl = document.createElement("div");
    previewEl.className = "layer-item-preview";
    previewEl.style.background = generateBackgroundStyle([layer]);

    info.appendChild(typeEl);
    info.appendChild(previewEl);

    const actions = document.createElement("div");
    actions.className = "layer-item-actions";

    const moveUpBtn = document.createElement("button");
    moveUpBtn.className = "btn-icon";
    moveUpBtn.textContent = "↑";
    moveUpBtn.onclick = (e) => {
      e.stopPropagation();
      AppState.moveLayer(layer.id, "up");
      updateUI();
    };

    const moveDownBtn = document.createElement("button");
    moveDownBtn.className = "btn-icon";
    moveDownBtn.textContent = "↓";
    moveDownBtn.onclick = (e) => {
      e.stopPropagation();
      AppState.moveLayer(layer.id, "down");
      updateUI();
    };

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "btn-icon delete";
    deleteBtn.textContent = "✕";
    // Запретить удаление, если это последний слой
    if (AppState.layers.length <= 1) {
      deleteBtn.disabled = true;
      deleteBtn.title = "Нельзя удалить последний слой";
      deleteBtn.style.opacity = "0.5";
      deleteBtn.style.cursor = "not-allowed";
    } else {
      deleteBtn.onclick = (e) => {
        e.stopPropagation();
        AppState.removeLayer(layer.id);
        updateUI();
      };
    }

    actions.appendChild(moveUpBtn);
    actions.appendChild(moveDownBtn);
    actions.appendChild(deleteBtn);

    layerEl.appendChild(info);
    layerEl.appendChild(actions);

    layerEl.onclick = () => {
      AppState.selectedLayerId = layer.id;
      updateUI();
    };

    container.appendChild(layerEl);
  });
}

function renderEditorForm() {
  const editorSection = document.getElementById("editorSection");

  if (!AppState.selectedLayerId) {
    editorSection.style.display = "none";
    return;
  }

  const layer = AppState.getLayer(AppState.selectedLayerId);
  if (!layer) {
    editorSection.style.display = "none";
    return;
  }

  editorSection.style.display = "block";

  // Обновляем значения формы
  document.getElementById("gradientType").value = layer.type;
  document.getElementById("angle").value = layer.angle;
  document.getElementById("angleValue").textContent = layer.angle;

  // Парсим позицию и обновляем ползунки
  const { x, y } = parsePosition(layer.position);
  document.getElementById("positionX").value = x;
  document.getElementById("positionXValue").textContent = 50 + x;
  document.getElementById("positionY").value = y;
  document.getElementById("positionYValue").textContent = 50 + y;

  document.getElementById("blendMode").value = layer.blendMode;

  // Управление видимостью элементов в зависимости от типа градиента
  const angleControl = document.getElementById("angleControl");
  const positionControl = document.getElementById("positionControl");
  const radialShapeControl = document.getElementById("radialShapeControl");
  const radialSizeControl = document.getElementById("radialSizeControl");

  if (layer.type.includes("conic")) {
    angleControl.style.display = "block";
    positionControl.style.display = "block";
    radialShapeControl.style.display = "none";
    radialSizeControl.style.display = "none";
  } else if (layer.type.includes("linear")) {
    angleControl.style.display = "block";
    positionControl.style.display = "none";
    radialShapeControl.style.display = "none";
    radialSizeControl.style.display = "none";
  } else if (layer.type.includes("radial")) {
    angleControl.style.display = "none";
    positionControl.style.display = "block";
    radialShapeControl.style.display = "block";
    radialSizeControl.style.display = "block";

    // Set radial controls values
    document.getElementById("radialShape").value =
      layer.radialShape || "circle";
    document.getElementById("radialSize").value =
      layer.radialSize || "farthest-corner";
  }

  // Рендерим цветовые стопы
  renderColorStops(layer);
}

function renderColorStops(layer) {
  const container = document.getElementById("colorStopsList");
  container.innerHTML = "";

  layer.colorStops.forEach((stop, index) => {
    const stopEl = document.createElement("div");
    stopEl.className = "color-stop";

    const inputWrapper = document.createElement("div");
    inputWrapper.className = "color-input-wrapper";

    const colorInput = document.createElement("input");
    colorInput.type = "color";
    colorInput.className = "color-input";
    colorInput.value = stop.color;
    colorInput.onchange = (e) => {
      AppState.updateColorStop(
        layer.id,
        index,
        e.target.value,
        stop.position,
        stop.opacity,
        stop.unit
      );
      updateUI();
    };

    const posInput = document.createElement("input");
    posInput.type = "number";
    posInput.min = 0;
    posInput.max = 1000;
    posInput.value = stop.position;
    posInput.onchange = (e) => {
      const pos = parseInt(e.target.value);
      if (isNaN(pos)) return;
      AppState.updateColorStop(
        layer.id,
        index,
        stop.color,
        pos,
        stop.opacity,
        stop.unit
      );
      updateUI();
    };

    const unitSelect = document.createElement("select");
    unitSelect.className = "unit-select";
    unitSelect.innerHTML = `
      <option value="%" ${stop.unit === "%" ? "selected" : ""}>%</option>
      <option value="px" ${stop.unit === "px" ? "selected" : ""}>px</option>
    `;
    unitSelect.onchange = (e) => {
      AppState.updateColorStop(
        layer.id,
        index,
        stop.color,
        stop.position,
        stop.opacity,
        e.target.value
      );
      updateUI();
    };

    inputWrapper.appendChild(colorInput);
    inputWrapper.appendChild(posInput);
    inputWrapper.appendChild(unitSelect);

    // Add opacity control
    const opacityInputWrapper = document.createElement("div");
    opacityInputWrapper.className = "opacity-input-wrapper";

    const opacityInput = document.createElement("input");
    opacityInput.type = "range";
    opacityInput.className = "opacity-input";
    opacityInput.min = 0;
    opacityInput.max = 100;
    opacityInput.value = stop.opacity !== undefined ? stop.opacity : 100;
    opacityInput.onchange = (e) => {
      AppState.updateColorStop(
        layer.id,
        index,
        stop.color,
        stop.position,
        parseInt(e.target.value),
        stop.unit
      );
      updateUI();
    };

    const opacityLabel = document.createElement("span");
    opacityLabel.style.fontSize = "12px";
    opacityLabel.style.color = "#666";
    opacityLabel.style.marginLeft = "4px";
    opacityLabel.textContent = `${opacityInput.value}%`;
    opacityInput.onchange = (e) => {
      opacityLabel.textContent = `${e.target.value}%`;
      AppState.updateColorStop(
        layer.id,
        index,
        stop.color,
        stop.position,
        parseInt(e.target.value),
        stop.unit
      );
      updateUI();
    };

    opacityInputWrapper.appendChild(opacityLabel);
    opacityInputWrapper.appendChild(opacityInput);

    const removeBtn = document.createElement("button");
    removeBtn.className = "color-stop-remove";
    removeBtn.textContent = "✕";
    removeBtn.onclick = () => {
      AppState.removeColorStop(layer.id, index);
      updateUI();
    };

    stopEl.appendChild(inputWrapper);
    stopEl.appendChild(opacityInputWrapper);
    stopEl.appendChild(removeBtn);
    container.appendChild(stopEl);
  });
}

function renderPreview() {
  const preview = document.getElementById("preview");
  const background = generateBackgroundStyle(AppState.layers);

  preview.style.background = background;

  // Применяем blend-modes
  if (AppState.layers.length > 0) {
    const blendModes = AppState.layers.map((l) => l.blendMode).join(", ");
    preview.style.backgroundBlendMode = blendModes;
  }
}

function renderCSSOutput() {
  const output = document.getElementById("cssOutput");
  output.value = generateGradientCSS(AppState.layers);
}

function updateUI() {
  renderLayersList();
  renderEditorForm();
  renderPreview();
  renderCSSOutput();
}

function getGradientTypeLabel(type) {
  const labels = {
    "linear-gradient": "Linear",
    "radial-gradient": "Radial",
    "conic-gradient": "Conic",
    "repeating-linear-gradient": "Repeating Linear",
    "repeating-radial-gradient": "Repeating Radial",
    "repeating-conic-gradient": "Repeating Conic",
  };
  return labels[type] || type;
}

// ============================================================
// EVENT HANDLERS - Обработчики событий
// ============================================================

function setupEventListeners() {
  // Добавление нового слоя
  document.getElementById("addLayerBtn").addEventListener("click", () => {
    AppState.addLayer("linear-gradient");
    updateUI();
  });

  // Форма редактирования слоя
  document.getElementById("gradientType").addEventListener("change", (e) => {
    if (AppState.selectedLayerId) {
      AppState.updateLayer(AppState.selectedLayerId, { type: e.target.value });
      updateUI();
    }
  });

  document.getElementById("angle").addEventListener("input", (e) => {
    document.getElementById("angleValue").textContent = e.target.value;
    if (AppState.selectedLayerId) {
      const angle = parseInt(e.target.value);
      if (!isNaN(angle)) {
        AppState.updateLayer(AppState.selectedLayerId, {
          angle: angle,
        });
        updateUI();
      }
    }
  });

  document.getElementById("positionX").addEventListener("input", (e) => {
    const x = parseInt(e.target.value);
    const y = parseInt(document.getElementById("positionY").value);
    document.getElementById("positionXValue").textContent = 50 + x;
    if (AppState.selectedLayerId) {
      AppState.updateLayer(AppState.selectedLayerId, {
        position: formatPosition(x, y),
      });
      updateUI();
    }
  });

  document.getElementById("positionY").addEventListener("input", (e) => {
    const y = parseInt(e.target.value);
    const x = parseInt(document.getElementById("positionX").value);
    document.getElementById("positionYValue").textContent = 50 + y;
    if (AppState.selectedLayerId) {
      AppState.updateLayer(AppState.selectedLayerId, {
        position: formatPosition(x, y),
      });
      updateUI();
    }
  });

  document.getElementById("blendMode").addEventListener("change", (e) => {
    if (AppState.selectedLayerId) {
      AppState.updateLayer(AppState.selectedLayerId, {
        blendMode: e.target.value,
      });
      updateUI();
    }
  });

  document.getElementById("radialShape").addEventListener("change", (e) => {
    if (AppState.selectedLayerId) {
      AppState.updateLayer(AppState.selectedLayerId, {
        radialShape: e.target.value,
      });
      updateUI();
    }
  });

  document.getElementById("radialSize").addEventListener("change", (e) => {
    if (AppState.selectedLayerId) {
      AppState.updateLayer(AppState.selectedLayerId, {
        radialSize: e.target.value,
      });
      updateUI();
    }
  });

  // Добавление нового цветового стопа
  document.getElementById("addColorStopBtn").addEventListener("click", () => {
    if (AppState.selectedLayerId) {
      AppState.addColorStop(AppState.selectedLayerId);
      updateUI();
    }
  });

  // Переключение формы превью
  document.getElementById("previewShape").addEventListener("change", (e) => {
    const preview = document.getElementById("preview");
    preview.className = `preview ${e.target.value}`;
  });

  // Копирование CSS
  document.getElementById("copyCssBtn").addEventListener("click", () => {
    const css = document.getElementById("cssOutput").value;
    navigator.clipboard.writeText(css).then(() => {
      showNotification("CSS скопирован в буфер обмена!");
    });
  });

  // Presets
  document.querySelectorAll("[data-preset]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      loadPreset(e.target.dataset.preset);
    });
  });

  // Select для примеров
  const presetsSelect = document.getElementById("presetsSelect");
  if (presetsSelect) {
    presetsSelect.addEventListener("change", (e) => {
      if (e.target.value) {
        loadPreset(e.target.value);
      }
    });
  }

  // Toggles для примеров
  const togglePresetsBtn = document.getElementById("togglePresetsBtn");
  const presetButtons = document.getElementById("presetButtons");
  if (togglePresetsBtn && presetButtons) {
    togglePresetsBtn.addEventListener("click", () => {
      const isVisible = presetButtons.style.display !== "none";
      presetButtons.style.display = isVisible ? "none" : "flex";
      togglePresetsBtn.textContent = isVisible ? "▼" : "▲";
    });
  }
}

function showNotification(message) {
  const notification = document.createElement("div");
  notification.className = "notification";
  notification.textContent = message;
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.remove();
  }, 3000);
}

// ============================================================
// PRESETS - Примеры градиентов
// ============================================================

const PRESETS = {
  "arctic-aurora": {
    shape: "rectangle",
    layers: [
      {
        type: "radial-gradient",
        position: "70% 80%",
        colorStops: [
          { color: "#00ff88", position: 0, opacity: 50 },
          { color: "#00cc66", position: 50, opacity: 30 },
          { color: "#00cc66", position: 100, opacity: 0 },
        ],
        blendMode: "screen",
      },
      {
        type: "radial-gradient",
        position: "30% 20%",
        colorStops: [
          { color: "#00d4ff", position: 0, opacity: 60 },
          { color: "#0099cc", position: 50, opacity: 40 },
          { color: "#0099cc", position: 100, opacity: 0 },
        ],
        blendMode: "screen",
      },
      {
        type: "linear-gradient",
        angle: 180,
        colorStops: [
          { color: "#0c0c0c", position: 0, opacity: 100 },
          { color: "#1a1a2e", position: 50, opacity: 100 },
          { color: "#16213e", position: 100, opacity: 100 },
        ],
      },
    ],
  },
  "cosmic-nebula": {
    shape: "rectangle",
    layers: [
      {
        type: "radial-gradient",
        position: "60% 70%",
        colorStops: [
          { color: "#dc2626", position: 0, opacity: 80 },
          { color: "#ef4444", position: 40, opacity: 60 },
          { color: "#f87171", position: 100, opacity: 20 },
        ],
        blendMode: "multiply",
      },
      {
        type: "radial-gradient",
        position: "40% 30%",
        colorStops: [
          { color: "#4c1d95", position: 0, opacity: 100 },
          { color: "#7c3aed", position: 30, opacity: 100 },
          { color: "#a855f7", position: 60, opacity: 100 },
          { color: "#c084fc", position: 100, opacity: 100 },
        ],
      },
    ],
  },
  "lava-flow": {
    shape: "rectangle",
    layers: [
      {
        type: "radial-gradient",
        position: "30% 70%",
        colorStops: [
          { color: "#ffedd5", position: 0, opacity: 60 },
          { color: "#fed7aa", position: 50, opacity: 30 },
          { color: "#fdba74", position: 100, opacity: 0 },
        ],
        blendMode: "overlay",
      },
      {
        type: "linear-gradient",
        angle: 45,
        colorStops: [
          { color: "#7f1d1d", position: 0, opacity: 100 },
          { color: "#dc2626", position: 20, opacity: 100 },
          { color: "#ea580c", position: 40, opacity: 100 },
          { color: "#f97316", position: 60, opacity: 100 },
          { color: "#fb923c", position: 80, opacity: 100 },
          { color: "#fdba74", position: 100, opacity: 100 },
        ],
      },
    ],
  },
  "royal-purple": {
    shape: "rectangle",
    layers: [
      {
        type: "linear-gradient",
        angle: 135,
        colorStops: [
          { color: "#2d1b69", position: 0, opacity: 100 },
          { color: "#4338ca", position: 25, opacity: 100 },
          { color: "#6366f1", position: 50, opacity: 100 },
          { color: "#8b5cf6", position: 75, opacity: 100 },
          { color: "#a855f7", position: 100, opacity: 100 },
        ],
      },
      {
        type: "radial-gradient",
        position: "20% 80%",
        colorStops: [
          { color: "#fbbf24", position: 0, opacity: 50 },
          { color: "#f59e0b", position: 50, opacity: 25 },
          { color: "#d97706", position: 100, opacity: 0 },
        ],
        blendMode: "screen",
      },
    ],
  },
  chip: {
    shape: "circle",
    layers: [
      {
        type: "radial-gradient",
        position: "center",
        colorStops: [
          { color: "transparent", position: 50, opacity: 0 },
          { color: "#686a6a", position: 50, opacity: 100 },
          { color: "#686a6a", position: 54, opacity: 100 },
          { color: "transparent", position: 54, opacity: 0 },
        ],
      },
      {
        type: "radial-gradient",
        position: "center",
        colorStops: [
          { color: "transparent", position: 0, opacity: 0 },
          { color: "#3a5bc9", position: 0, opacity: 100 },
          { color: "#3a5bc9", position: 54, opacity: 100 },
          { color: "transparent", position: 54, opacity: 0 },
        ],
      },
      {
        type: "repeating-conic-gradient",
        angle: 10,
        position: "center",
        colorStops: [
          { color: "#ffffff", position: 0, opacity: 100 },
          { color: "#ffffff", position: 20, opacity: 100 },
          { color: "transparent", position: 20, opacity: 0 },
          { color: "transparent", position: 40, opacity: 0 },
        ],
      },
      {
        type: "radial-gradient",
        position: "30% 30%",
        colorStops: [
          { color: "#4972fb", position: 0, opacity: 100 },
          { color: "#4972fb", position: 30, opacity: 100 },
          { color: "#4972fb", position: 60, opacity: 100 },
          { color: "#4972fb", position: 100, opacity: 100 },
        ],
      },
    ],
  },
  "nebula-core": {
    shape: "rectangle",
    layers: [
      {
        type: "radial-gradient",
        position: "70% 30%",
        colorStops: [
          { color: "#dc2626", position: 0, opacity: 80 },
          { color: "#ea580c", position: 30, opacity: 70 },
          { color: "#f59e0b", position: 60, opacity: 60 },
          { color: "#fbbf24", position: 90, opacity: 50 },
          { color: "#fde047", position: 100, opacity: 40 },
        ],
        blendMode: "screen",
      },
      {
        type: "radial-gradient",
        position: "40% 60%",
        colorStops: [
          { color: "#4c1d95", position: 0, opacity: 100 },
          { color: "#5b21b6", position: 30, opacity: 100 },
          { color: "#7c3aed", position: 60, opacity: 100 },
          { color: "#8b5cf6", position: 90, opacity: 100 },
          { color: "#a78bfa", position: 100, opacity: 100 },
        ],
      },
      {
        type: "conic-gradient",
        angle: 90,
        position: "50% 50%",
        colorStops: [
          { color: "#ffffff", position: 0, opacity: 60 },
          { color: "#f8fafc", position: 20, opacity: 50 },
          { color: "#f1f5f9", position: 40, opacity: 40 },
          { color: "#e2e8f0", position: 60, opacity: 30 },
          { color: "#cbd5e1", position: 80, opacity: 20 },
          { color: "#ffffff", position: 100, opacity: 60 },
        ],
        blendMode: "overlay",
      },
      {
        type: "repeating-radial-gradient",
        position: "center",
        colorStops: [
          { color: "transparent", position: 0, opacity: 0 },
          { color: "transparent", position: 40, opacity: 0 },
          { color: "#ffffff", position: 40, opacity: 25 },
          { color: "#ffffff", position: 60, opacity: 25 },
          { color: "transparent", position: 60, opacity: 0 },
          { color: "transparent", position: 100, opacity: 0 },
        ],
        blendMode: "overlay",
      },
    ],
  },
  watercolour: {
    shape: "rectangle",
    layers: [
      {
        type: "radial-gradient",
        position: "20% 20%",
        colorStops: [
          { color: "#ffffff", position: 0, opacity: 100 },
          { color: "#f8fafc", position: 30, opacity: 80 },
          { color: "#f1f5f9", position: 60, opacity: 60 },
          { color: "#e2e8f0", position: 100, opacity: 0 },
        ],
      },
      {
        type: "radial-gradient",
        position: "80% 40%",
        colorStops: [
          { color: "#fbbf24", position: 0, opacity: 90 },
          { color: "#f59e0b", position: 40, opacity: 70 },
          { color: "#d97706", position: 80, opacity: 50 },
          { color: "#b45309", position: 100, opacity: 0 },
        ],
        blendMode: "screen",
      },
      {
        type: "radial-gradient",
        position: "60% 80%",
        colorStops: [
          { color: "#3b82f6", position: 0, opacity: 80 },
          { color: "#2563eb", position: 40, opacity: 60 },
          { color: "#1d4ed8", position: 80, opacity: 40 },
          { color: "#1e40af", position: 100, opacity: 0 },
        ],
        blendMode: "screen",
      },
      {
        type: "radial-gradient",
        position: "40% 60%",
        colorStops: [
          { color: "#10b981", position: 0, opacity: 70 },
          { color: "#059669", position: 40, opacity: 50 },
          { color: "#047857", position: 80, opacity: 30 },
          { color: "#065f46", position: 100, opacity: 0 },
        ],
        blendMode: "screen",
      },
      {
        type: "radial-gradient",
        position: "90% 10%",
        colorStops: [
          { color: "#ef4444", position: 0, opacity: 60 },
          { color: "#dc2626", position: 40, opacity: 40 },
          { color: "#b91c1c", position: 80, opacity: 20 },
          { color: "#991b1b", position: 100, opacity: 0 },
        ],
        blendMode: "screen",
      },
    ],
  },
  target: {
    shape: "circle",
    layers: [
      {
        type: "radial-gradient",
        position: "center",
        colorStops: [
          { color: "#000000", position: 0, opacity: 100 },
          { color: "#000000", position: 20, opacity: 100 },
          { color: "transparent", position: 20, opacity: 0 },
          { color: "transparent", position: 100, opacity: 0 },
        ],
      },
      {
        type: "radial-gradient",
        position: "center",
        colorStops: [
          { color: "transparent", position: 0, opacity: 0 },
          { color: "transparent", position: 20, opacity: 0 },
          { color: "#ffffff", position: 20, opacity: 100 },
          { color: "#ffffff", position: 40, opacity: 100 },
          { color: "transparent", position: 40, opacity: 0 },
          { color: "transparent", position: 100, opacity: 0 },
        ],
      },
      {
        type: "radial-gradient",
        position: "center",
        colorStops: [
          { color: "transparent", position: 0, opacity: 0 },
          { color: "transparent", position: 40, opacity: 0 },
          { color: "#dc2626", position: 40, opacity: 100 },
          { color: "#dc2626", position: 60, opacity: 100 },
          { color: "transparent", position: 60, opacity: 0 },
          { color: "transparent", position: 100, opacity: 0 },
        ],
      },
      {
        type: "radial-gradient",
        position: "center",
        colorStops: [
          { color: "transparent", position: 0, opacity: 0 },
          { color: "transparent", position: 60, opacity: 0 },
          { color: "#ffffff", position: 60, opacity: 100 },
          { color: "#ffffff", position: 80, opacity: 100 },
          { color: "transparent", position: 80, opacity: 0 },
          { color: "transparent", position: 100, opacity: 0 },
        ],
      },
      {
        type: "radial-gradient",
        position: "center",
        colorStops: [
          { color: "transparent", position: 0, opacity: 0 },
          { color: "transparent", position: 80, opacity: 0 },
          { color: "#dc2626", position: 80, opacity: 100 },
          { color: "#dc2626", position: 100, opacity: 100 },
        ],
      },
    ],
  },
  "dark-pattern": {
    shape: "rectangle",
    layers: [
      {
        type: "repeating-linear-gradient",
        angle: 0,
        colorStops: [
          { color: "#1f1f1f", position: 0, opacity: 100, unit: "px" },
          { color: "#1f1f1f", position: 2, opacity: 100, unit: "px" },
          { color: "#2a2a2a", position: 2, opacity: 100, unit: "px" },
          { color: "#2a2a2a", position: 6, opacity: 100, unit: "px" },
        ],
      },
    ],
  },
  "paper-noise": {
    shape: "rectangle",
    layers: [
      {
        type: "repeating-radial-gradient",
        position: "center",
        colorStops: [
          { color: "#000000", position: 0, opacity: 3, unit: "px" },
          { color: "#000000", position: 1, opacity: 3, unit: "px" },
          { color: "transparent", position: 1, opacity: 0, unit: "px" },
          { color: "transparent", position: 6, opacity: 0, unit: "px" },
        ],
      },
    ],
  },
  "generative-texture": {
    shape: "rectangle",
    layers: [
      {
        type: "repeating-radial-gradient",
        position: "20% 30%",
        colorStops: [
          { color: "#ffffff", position: 0, opacity: 8, unit: "px" },
          { color: "#ffffff", position: 2, opacity: 8, unit: "px" },
          { color: "transparent", position: 4, opacity: 0, unit: "px" },
        ],
      },
      {
        type: "repeating-radial-gradient",
        position: "80% 70%",
        colorStops: [
          { color: "#000000", position: 0, opacity: 10, unit: "px" },
          { color: "#000000", position: 3, opacity: 10, unit: "px" },
          { color: "transparent", position: 6, opacity: 0, unit: "px" },
        ],
      },
      {
        type: "linear-gradient",
        angle: 135,
        colorStops: [
          { color: "#667eea", position: 0, opacity: 100, unit: "%" },
          { color: "#764ba2", position: 100, opacity: 100, unit: "%" },
        ],
      },
    ],
  },
  "pseudo-liquid-metal": {
    shape: "rectangle",
    layers: [
      {
        type: "radial-gradient",
        position: "30% 30%",
        colorStops: [
          { color: "#ffffff", position: 0, opacity: 35 },
          { color: "transparent", position: 40, opacity: 0 },
        ],
      },
      {
        type: "radial-gradient",
        position: "70% 60%",
        colorStops: [
          { color: "#000000", position: 0, opacity: 35 },
          { color: "transparent", position: 45, opacity: 0 },
        ],
      },
      {
        type: "linear-gradient",
        angle: 120,
        colorStops: [
          { color: "#bdc3c7", position: 0, opacity: 100 },
          { color: "#2c3e50", position: 50, opacity: 100 },
          { color: "#bdc3c7", position: 100, opacity: 100 },
        ],
      },
    ],
  },
  "fractal-techno-pattern": {
    shape: "rectangle",
    layers: [
      {
        type: "repeating-linear-gradient",
        angle: 90,
        colorStops: [
          { color: "#ffffff", position: 0, opacity: 5 },
          { color: "#ffffff", position: 1, opacity: 5, unit: "px" },
          { color: "transparent", position: 1, opacity: 0, unit: "px" },
          { color: "transparent", position: 12, opacity: 0, unit: "px" },
        ],
      },
      {
        type: "repeating-linear-gradient",
        angle: 0,
        colorStops: [
          { color: "#ffffff", position: 0, opacity: 3 },
          { color: "#ffffff", position: 1, opacity: 3, unit: "px" },
          { color: "transparent", position: 1, opacity: 0, unit: "px" },
          { color: "transparent", position: 16, opacity: 0, unit: "px" },
        ],
      },
      {
        type: "linear-gradient",
        angle: 135,
        colorStops: [
          { color: "#141e30", position: 0, opacity: 100 },
          { color: "#243b55", position: 100, opacity: 100 },
        ],
      },
    ],
  },
  "abstract-spots": {
    shape: "rectangle",
    layers: [
      {
        type: "radial-gradient",
        position: "20% 30%",
        colorStops: [
          { color: "#ff6a00", position: 0, opacity: 100 },
          { color: "transparent", position: 50, opacity: 0 },
        ],
        blendMode: "screen",
      },
      {
        type: "radial-gradient",
        position: "80% 20%",
        colorStops: [
          { color: "#ee0979", position: 0, opacity: 100 },
          { color: "transparent", position: 45, opacity: 0 },
        ],
        blendMode: "screen",
      },
      {
        type: "radial-gradient",
        position: "50% 80%",
        colorStops: [
          { color: "#00c6ff", position: 0, opacity: 100 },
          { color: "transparent", position: 50, opacity: 0 },
        ],
        blendMode: "screen",
      },
      {
        type: "linear-gradient",
        angle: 0,
        colorStops: [
          { color: "#0f2027", position: 0, opacity: 100 },
          { color: "#0f2027", position: 100, opacity: 100 },
        ],
        blendMode: "normal",
      },
    ],
  },
  "offset-ellipse-demo": {
    shape: "rectangle",
    layers: [
      {
        type: "radial-gradient",
        position: "top left",
        radialShape: "ellipse",
        radialSize: "farthest-corner",
        colorStops: [
          { color: "#fddb92", position: 0, opacity: 100 },
          { color: "#d1fdff", position: 50, opacity: 100 },
          { color: "#ffffff", position: 100, opacity: 100 },
        ],
        blendMode: "normal",
      },
    ],
  },
  "deep-dark-gradient": {
    shape: "rectangle",
    layers: [
      {
        type: "radial-gradient",
        position: "center",
        radialShape: "ellipse",
        radialSize: "farthest-corner",
        colorStops: [
          { color: "#434343", position: 0, opacity: 100 },
          { color: "#1c1c1c", position: 60, opacity: 100 },
          { color: "#000000", position: 100, opacity: 100 },
        ],
        blendMode: "normal",
      },
    ],
  },
};

function loadPreset(presetName) {
  const preset = PRESETS[presetName];
  if (!preset) return;

  AppState.layers = [];
  AppState.nextLayerId = 0;
  AppState.selectedLayerId = null;

  // Устанавливаем форму превью
  const shape = preset.shape || "rectangle";
  document.getElementById("previewShape").value = shape;
  // Обновляем класс превью элемента
  document.getElementById("preview").className = `preview ${shape}`;

  preset.layers.forEach((layerData) => {
    const layer = {
      id: `layer-${AppState.nextLayerId++}`,
      type: layerData.type,
      angle: layerData.angle ?? 90,
      position: layerData.position || "center",
      radialShape: layerData.radialShape || "circle",
      radialSize: layerData.radialSize || "farthest-corner",
      colorStops: layerData.colorStops,
      blendMode: layerData.blendMode || "normal",
    };
    AppState.layers.push(layer);
  });

  if (AppState.layers.length > 0) {
    AppState.selectedLayerId = AppState.layers[0].id;
  }

  updateUI();
  showNotification(`Preset "${presetName}" загружен!`);
}

// ============================================================
// INITIALIZATION - Инициализация приложения
// ============================================================

document.addEventListener("DOMContentLoaded", () => {
  // Загружаем preset arctic-aurora при загрузке страницы
  loadPreset("arctic-aurora");

  // Настраиваем обработчики событий
  setupEventListeners();

  // Первый рендер
  updateUI();
});
