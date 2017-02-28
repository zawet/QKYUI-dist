/****
特殊调用，学生信息编辑管理弹模态窗口
****/ 

define(function(require,exports) {
	var infomo=require("./modal_pop");
	infomo.modalpop("#familyadd",".familyedit","#familytit","#family_modal","家庭记录");
	infomo.modalpop("#resumeadd",".resumeedit","#resumetit","#resume_modal","学习简历");
	infomo.modalpop("#awardadd",".awardedit","#awardtit","#award_modal","奖励信息");
	infomo.modalpop("#punishmentadd",".punishmentedit","#punishmenttit","#punishment_modal","处罚信息");
});