<>
  <meta charSet="utf-8" />
  <title>Blockly 演算法解題系統-張世杰老師</title>
  <style
    dangerouslySetInnerHTML={{
      __html:
        "\n    body, html { margin: 0; padding: 0; height: 100%; font-family: 'Helvetica Neue', 'Arial', 'PingFang TC', 'Microsoft JhengHei', sans-serif; background-color: #f0f2f5; }\n    #app-container { display: flex; height: 100vh; }\n    #main-panel { flex: 3; display: flex; flex-direction: column; padding: 10px; }\n    #side-panel { flex: 2; padding: 15px; background-color: #ffffff; border-left: 2px solid #ddd; display: flex; flex-direction: column; overflow-y: auto; }\n    #blockly-container { position: relative; width: 100%; flex-grow: 1; border: 1px solid #ccc; }\n    #blocklyDiv { position: absolute; top: 0; left: 0; right: 0; bottom: 0; }\n    #results-area { height: 250px; margin-top: 10px; border: 1px solid #ccc; padding: 10px; overflow-y: scroll; background-color: #282c34; color: #abb2bf; font-family: 'Courier New', Courier, monospace; white-space: pre-wrap; font-size: 14px; }\n    .panel-title { font-size: 1.5em; font-weight: bold; margin-bottom: 10px; color: #333; border-bottom: 2px solid #007bff; padding-bottom: 5px; }\n    #problem-description, #hint-area, #solution-area, #manage-problems { margin-bottom: 20px; }\n    #hint-text, #solution-text { background-color: #e9f7fe; border-left: 5px solid #2196F3; padding: 15px; margin-bottom: 10px; min-height: 50px; }\n    .button-group { margin-bottom: 10px; display: flex; flex-wrap: wrap; }\n    button { padding: 8px 15px; font-size: 1em; margin-right: 10px; margin-bottom: 5px; cursor: pointer; border: none; border-radius: 4px; background-color: #007bff; color: white; transition: background-color 0.3s; }\n    button:hover { background-color: #0056b3; }\n    button.secondary { background-color: #6c757d; }\n    button.secondary:hover { background-color: #5a6268; }\n    button.warning { background-color: #ffc107; color: #212529; }\n    button.warning:hover { background-color: #e0a800; }\n    button.danger { background-color: #dc3545; }\n    button.danger:hover { background-color: #c82333; }\n    #problem-selector { padding: 5px; margin-left: 10px; font-size: 1em; }\n    .result-item { padding: 5px; border-bottom: 1px dashed #555; }\n    .result-item.success { color: #98c379; }\n    .result-item.failure { color: #e06c75; }\n    .result-item.log { color: #61afef; }\n    .result-item.info { color: #e5c07b; }\n    .hidden-input { display: none; }\n    #edit-problem-modal { display: none; position: fixed; z-index: 1000; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); justify-content: center; align-items: center; }\n    #edit-problem-form { background: #fff; padding: 20px; border-radius: 8px; width: 70vw; max-width: 800px; max-height: 90vh; overflow-y: auto; }\n    #edit-problem-form label { display: block; margin: 10px 0 5px; font-weight: bold; }\n    #edit-problem-form input, #edit-problem-form textarea, #edit-problem-form select { width: 100%; padding: 8px; margin-bottom: 10px; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box; }\n    #edit-problem-form textarea { height: 100px; resize: vertical; }\n    .form-section { border: 1px solid #ddd; padding: 15px; margin-top: 15px; border-radius: 5px; }\n    .dynamic-item { background-color: #f9f9f9; padding: 10px; border: 1px solid #eee; margin-bottom: 10px; border-radius: 4px; }\n    .dynamic-item-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }\n  "
    }}
  />
  <div id="app-container">
    <div id="main-panel">
      <div className="button-group">
        <button onclick="runCode()">▶️ 執行程式</button>
        <button className="secondary" onclick="workspace.undo(false)">
          ↩️ 回復
        </button>
        <button className="secondary" onclick="workspace.redo(false)">
          ↪️ 重做
        </button>
        <button className="secondary" onclick="exportWorkspace()">
          📤 匯出程式碼
        </button>
        <button
          className="secondary"
          onclick="document.getElementById('import-workspace-input').click()"
        >
          📥 匯入程式碼
        </button>
        <select id="problem-selector" onchange="loadProblem(this.value)" />
      </div>
      <div id="blockly-container">
        <div id="blocklyDiv" />
      </div>
      <div id="results-area">點擊「執行程式」以查看結果...</div>
    </div>
    <div id="side-panel">
      <h2 id="problem-title" className="panel-title">
        題目
      </h2>
      <div id="problem-description" />
      <h2 className="panel-title">步驟提示</h2>
      <div id="hint-area">
        <div id="hint-text">點擊下方按鈕開始。</div>
        <div className="button-group">
          <button id="hint-btn" onclick="nextHint()">
            下一步提示
          </button>
          <button className="secondary" onclick="showExampleBlock()">
            顯示範例積木
          </button>
        </div>
      </div>
      <h2 className="panel-title">參考解答</h2>
      <div id="solution-area">
        <div id="solution-text">點擊下方按鈕查看參考解答。</div>
        <div className="button-group">
          <button className="warning" onclick="showSolution()">
            顯示解答程式碼
          </button>
          <button className="warning" onclick="loadSolutionBlocks()">
            載入解答積木
          </button>
        </div>
      </div>
      <h2 className="panel-title">題目管理</h2>
      <div id="manage-problems">
        <div className="button-group">
          <button onclick="openAddProblemModal()">新增題目</button>
          <button className="secondary" onclick="openEditProblemModal()">
            編輯目前題目
          </button>
          <button
            className="secondary"
            onclick="document.getElementById('import-problems-input').click()"
          >
            匯入題庫
          </button>
          <button className="secondary" onclick="exportProblemSet()">
            匯出題庫
          </button>
        </div>
      </div>
    </div>
  </div>
  <input
    type="file"
    id="import-workspace-input"
    className="hidden-input"
    accept=".xml"
    onchange="importWorkspace(event)"
  />
  <input
    type="file"
    id="import-problems-input"
    className="hidden-input"
    accept=".json"
    onchange="importProblemSet(event)"
  />
  <div id="edit-problem-modal">
    <div id="edit-problem-form">
      <h3 id="modal-title">新增題目</h3>
      <label>題目 ID（唯一，不可重複）:</label>
      <input type="text" id="problem-id" required="" />
      <label>題目標題:</label>
      <input type="text" id="problem-title-input" required="" />
      <label>題目描述 (支援 HTML):</label>
      <textarea id="problem-description-input" required="" defaultValue={""} />
      <label>題目類型:</label>
      <select id="problem-type">
        <option value="testcase">自動評測 (testcase)</option>
        <option value="interactive">互動式 (interactive)</option>
      </select>
      <div className="form-section">
        <label>函式名稱（testcase 題目必填）:</label>
        <input type="text" id="function-name" />
        <div className="dynamic-item-header">
          <h4>測試案例</h4>
          <button onclick="addTestCaseRow()">新增案例</button>
        </div>
        <div id="test-cases-container" />
      </div>
      <div className="form-section">
        <div className="dynamic-item-header">
          <h4>步驟提示</h4>
          <button onclick="addHintRow()">新增提示</button>
        </div>
        <div id="hints-container" />
      </div>
      <div className="form-section">
        <h4>解答</h4>
        <label>解答程式碼（選填）:</label>
        <textarea id="solution-code" defaultValue={""} />
        <label>解答積木 XML（選填）:</label>
        <textarea id="solution-blockXml" defaultValue={""} />
      </div>
      <div className="button-group" style={{ marginTop: 20 }}>
        <button onclick="saveProblem()">儲存</button>
        <button className="danger" onclick="closeEditProblemModal()">
          取消
        </button>
      </div>
    </div>
  </div>
  <xml id="toolbox" style={{ display: "none" }}>
    <category name="邏輯" colour="%{BKY_LOGIC_HUE}">
      <block type="controls_if" />
      <block type="logic_compare" />
      <block type="logic_operation" />
      <block type="logic_negate" />
      <block type="logic_boolean" />
    </category>
    <category name="迴圈" colour="%{BKY_LOOPS_HUE}">
      <block type="controls_repeat_ext">
        <value name="TIMES">
          <shadow type="math_number">
            <field name="NUM">10</field>
          </shadow>
        </value>
      </block>
      <block type="controls_whileUntil" />
      <block type="controls_for">
        <value name="FROM">
          <shadow type="math_number">
            <field name="NUM">1</field>
          </shadow>
        </value>
        <value name="TO">
          <shadow type="math_number">
            <field name="NUM">10</field>
          </shadow>
        </value>
        <value name="BY">
          <shadow type="math_number">
            <field name="NUM">1</field>
          </shadow>
        </value>
      </block>
      <block type="controls_flow_statements" />
    </category>
    <category name="數學" colour="%{BKY_MATH_HUE}">
      <block type="math_number" />
      <block type="math_arithmetic" />
      <block type="math_single" />
      <block type="math_trig" />
      <block type="math_constant" />
      <block type="math_number_property" />
      <block type="math_round" />
      <block type="math_on_list" />
      <block type="math_modulo" />
      <block type="math_constrain" />
      <block type="math_random_int" />
      <block type="math_random_float" />
    </category>
    <category name="文字" colour="%{BKY_TEXTS_HUE}">
      <block type="text" />
      <block type="text_join" />
      <block type="text_append">
        <value name="TEXT">
          <shadow type="text" />
        </value>
      </block>
      <block type="text_length">
        <value name="VALUE">
          <shadow type="text">
            <field name="TEXT">abc</field>
          </shadow>
        </value>
      </block>
      <block type="text_isEmpty">
        <value name="VALUE">
          <shadow type="text">
            <field name="TEXT" />
          </shadow>
        </value>
      </block>
      <block type="text_indexOf" />
      <block type="text_charAt" />
      <block type="text_getSubstring" />
      <block type="text_changeCase" />
      <block type="text_trim" />
      <block type="text_print">
        <value name="TEXT">
          <shadow type="text">
            <field name="TEXT">abc</field>
          </shadow>
        </value>
      </block>
      <block type="text_prompt_ext">
        <value name="TEXT">
          <shadow type="text">
            <field name="TEXT">請輸入文字</field>
          </shadow>
        </value>
      </block>
    </category>
    <category name="列表" colour="%{BKY_LISTS_HUE}">
      <block type="lists_create_with" />
      <block type="lists_create_with">
        <mutation items={0} />
      </block>
      <block type="lists_repeat">
        <value name="NUM">
          <shadow type="math_number">
            <field name="NUM">5</field>
          </shadow>
        </value>
      </block>
      <block type="lists_length" />
      <block type="lists_isEmpty" />
      <block type="lists_indexOf" />
      <block type="lists_getIndex" />
      <block type="lists_setIndex" />
    </category>
    <sep />
    <category name="變數" colour="%{BKY_VARIABLES_HUE}" custom="VARIABLE" />
    <category name="函式" colour="%{BKY_PROCEDURES_HUE}" custom="PROCEDURE" />
  </xml>
</>
