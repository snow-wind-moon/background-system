<template>
    <el-form 
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="120px"     
      class="demo-ruleForm upForm"
      style="max-width: 600px;"
      enctype="multipart/form-data">
        <el-form-item label="店铺社会统一信用码">
            <el-input v-model= "ruleForm.id" name = "id"></el-input>
        </el-form-item>
        <el-form-item label="店铺名称" prop="name">
            <el-input v-model="ruleForm.name" name="name"></el-input>
        </el-form-item>
        <el-form-item label="详细地址" prop="address">
            <el-input v-model="ruleForm.address" name="address"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="phone">
            <el-input v-model="ruleForm.phone" name="phone"></el-input>
        </el-form-item>
        <el-form-item label="店铺简介" prop="info">
            <el-input v-model="ruleForm.info" name="info"></el-input>
        </el-form-item>
        <el-form-item label="店铺标语" prop="slogan">
            <el-input v-model="ruleForm.slogan" name="slogan"></el-input>
        </el-form-item>      
        <el-form-item label="店铺分类">
            <el-cascader v-model="value" :options="options" name = "category"></el-cascader>
        </el-form-item>      
        <el-form-item label="店铺特点">
            <ul class="feature-box">
                <li v-for="item in feature" :key="item.id">
                    <span style="margin-right: 4px;" :class="{ active: item.f }">{{ item.text }}</span>
                    <el-switch v-model="item.f" active-color="#13ce66" inactive-color="#bfcbd9"></el-switch>
                </li>
            </ul>
        </el-form-item>
        <el-form-item label="配送费" required>
            <el-input-number v-model="delivery" name = "delivery" :min="1" :max="10" label="描述文字"></el-input-number>
        </el-form-item>
        <el-form-item label="起送价" required>
            <el-input-number v-model="price" name = "price" :min="1" :max="10000" label="描述文字"></el-input-number>
        </el-form-item>
        <el-form-item label="营业时间" prop="delivery">
            <el-time-select
                placeholder="起始时间"
                name="startTime"
                v-model="startTime"
                :picker-options="{
                start: '00:00',
                step: '00:15',
                end: '23:00'
                }">
            </el-time-select>
            <el-time-select
                placeholder="结束时间"
                name="endTime"
                v-model="endTime"
                :picker-options="{
                start: '00:00',
                step: '00:15',
                end: '23:45',
                minTime: startTime
                }">
            </el-time-select>
        </el-form-item>
        <el-form-item label="上传店铺logo" prop="type">
            <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="logoSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="logoUrl" :src="logoUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
        </el-form-item>
        <el-form-item label="上传营业执照" prop="type">
            <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="manageSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="manageUrl" :src="manageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
        </el-form-item>
        <el-form-item label="上传餐饮许可证" prop="type">
            <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="diningSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="diningUrl" :src="diningUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
        </el-form-item>
        
       
       
        <el-form-item>
            <el-button type="primary" @click.native="submitForm()">立即创建</el-button>
            
        </el-form-item>
    </el-form>
</template>

<script>
import { mapActions } from 'vuex'
  export default {
    data() {
      return {
        ruleForm: {
          id: "",
          name: "",
          address: "",
          phone: "",
          info: "",
          slogan: "",
          region: "",
          date1: "",
          date2: "",
          delivery: false,
          type: [],
          resource: "",
          desc: ""
        },
        rules: {
          name: [ 
            { required: true, message: "请输入店铺名称", trigger: "blur" },
            { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" }
          ],
          address: [ 
            { required: true, message: "请输入地址", trigger: "blur" },
            { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" }
          ],
          info: [ 
            { required: true, message: "请输入店铺简介", trigger: "blur" },
            { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" }
          ],
          phone: [ 
            { required: true, message: "请输入店铺联系方式", trigger: "blur" },
            { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" }
          ],
          slogan: [ 
            { required: true, message: "请输入店铺标语", trigger: "blur" },
            { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" }
          ],
          region: [ 
            { required: true, message: "请选择店铺类型", trigger: "change" },           
          ],
          // date1: [
          //   {
          //     type: "date",
          //     required: true,
          //     message: "请选择日期",
          //     trigger: "change"
          //   }
          // ]
          
        },
        value: "",//店铺的分类
        options: [
          //店铺的分类选项
          {
            value: 'zhinan',
            label: '指南',
            children: [
              {
                value: 'shejiyuanze',
                label: '设计原则',
                children: [
                  {
                    value: 'yizhi',
                    label: '一致'
                  }, 
                  {
                    value: 'fankui',
                    label: '反馈'
                  }, 
                  {
                    value: 'xiaolv',
                    label: '效率'
                  }, 
                  {
                    value: 'kekong',
                    label: '可控'
                  }
                ]
              }, 
              {
                value: 'daohang',
                label: '导航',
                children: [
                  {
                    value: 'cexiangdaohang',
                    label: '侧向导航'
                  }, 
                  {
                    value: 'dingbudaohang',
                    label: '顶部导航'
                  }
                ]
              }
            ]
          }, 
          {
            value: 'zujian',
            label: '组件',
            children: [
              {
                value: 'basic',
                label: 'Basic',
                children: [
                  {
                    value: 'layout',
                    label: 'Layout 布局'
                  }, 
                  {
                    value: 'color',
                    label: 'Color 色彩'
                  }, 
                  {
                    value: 'typography',
                    label: 'Typography 字体'
                  }, 
                  {
                    value: 'icon',
                    label: 'Icon 图标'
                  }, 
                  {
                    value: 'button',
                    label: 'Button 按钮'
                  }
                ]
              }, 
              {
                value: 'form',
                label: 'Form',
                children: [
                  {
                    value: 'radio',
                    label: 'Radio 单选框'
                  }, 
                  {
                    value: 'checkbox',
                    label: 'Checkbox 多选框'
                  }, 
                  {
                    value: 'input',
                    label: 'Input 输入框'
                  },
                  {
                    value: 'input-number',
                    label: 'InputNumber 计数器'
                  }, 
                  {
                    value: 'select',
                    label: 'Select 选择器'
                  }, 
                  {
                    value: 'cascader',
                    label: 'Cascader 级联选择器'
                  }, 
                  {
                    value: 'switch',
                    label: 'Switch 开关'
                  }, 
                  {
                    value: 'slider',
                    label: 'Slider 滑块'
                  }, 
                  {
                    value: 'time-picker',
                    label: 'TimePicker 时间选择器'
                  }, 
                  {
                    value: 'date-picker',
                    label: 'DatePicker 日期选择器'
                  }, 
                  {
                    value: 'datetime-picker',
                    label: 'DateTimePicker 日期时间选择器'
                  }, 
                  {
                    value: 'upload',
                    label: 'Upload 上传'
                  }, 
                  {
                    value: 'rate',
                    label: 'Rate 评分'
                  }, 
                  {
                    value: 'form',
                    label: 'Form 表单'
                  }
                ]
              }, 
              {
                value: 'data',
                label: 'Data',
                children: [
                  {
                    value: 'table',
                    label: 'Table 表格'
                  }, 
                  {
                    value: 'tag',
                    label: 'Tag 标签'
                  }, 
                  {
                    value: 'progress',
                    label: 'Progress 进度条'
                  }, 
                  {
                    value: 'tree',
                    label: 'Tree 树形控件'
                  }, 
                  {
                    value: 'pagination',
                    label: 'Pagination 分页'
                  }, 
                  {
                    value: 'badge',
                    label: 'Badge 标记'
                  }
                ]
              }, 
              {
                value: 'notice',
                label: 'Notice',
                children: [
                  {
                    value: 'alert',
                    label: 'Alert 警告'
                  }, 
                  {
                    value: 'loading',
                    label: 'Loading 加载'
                  }, 
                  {
                    value: 'message',
                    label: 'Message 消息提示'
                  }, 
                  {
                    value: 'message-box',
                    label: 'MessageBox 弹框'
                  }, 
                  {
                    value: 'notification',
                    label: 'Notification 通知'
                  }
                ]
              }, 
              {
                value: 'navigation',
                label: 'Navigation',
                children: [
                  {
                    value: 'menu',
                    label: 'NavMenu 导航菜单'
                  }, 
                  {
                    value: 'tabs',
                    label: 'Tabs 标签页'
                  }, 
                  {
                    value: 'breadcrumb',
                    label: 'Breadcrumb 面包屑'
                  }, 
                  {
                    value: 'dropdown',
                    label: 'Dropdown 下拉菜单'
                  }, 
                  {
                    value: 'steps',
                    label: 'Steps 步骤条'
                  }
                ]
              }, 
              {
                value: 'others',
                label: 'Others',
                children: [
                  {
                    value: 'dialog',
                    label: 'Dialog 对话框'
                  }, 
                  {
                    value: 'tooltip',
                    label: 'Tooltip 文字提示'
                  }, 
                  {
                    value: 'popover',
                    label: 'Popover 弹出框'
                  }, 
                  {
                    value: 'card',
                    label: 'Card 卡片'
                  }, 
                  {
                    value: 'carousel',
                    label: 'Carousel 走马灯'
                  }, 
                  {
                    value: 'collapse',
                    label: 'Collapse 折叠面板'
                  }
                ]
              }
            ]
          }, 
          {
            value: 'ziyuan',
            label: '资源',
            children: [
              {
                value: 'axure',
                label: 'Axure Components'
              }, 
              {
                value: 'sketch',
                label: 'Sketch Templates'
              }, 
              {
                value: 'jiaohu',
                label: '组件交互文档'
              }
            ]
          }
        ],
        feature: [
          {
            id: 1,
            text: "品牌保证",
            f: false
          },
          {
            id: 2,
            text: "新开店铺",
            f: false
          },
          {
            id: 3,
            text: "蜂鸟专送",
            f: false
          },
          {
            id: 4,
            text: "外卖保",
            f: false
          },
          {
            id: 5,
            text: "开发票",
            f: false
          },
          {
            id: 6,
            text: "准时达",
            f: false
          }
        ],
        delivery: 1,//配送费
        price: 10, //起送价
        startTime: '',
        endTime: '',
        logoUrl: '',
        manageUrl: '',
        diningUrl: ''
      };
    },
    methods: {
      ...mapActions(['add']),
      logoSuccess (res, file) {
        this.logoUrl = URL.createObjectURL(file.raw);
      },
      manageSuccess (res, file) {
        this.manageUrl = URL.createObjectURL(file.raw);
      },
      diningSuccess (res, file) {
        this.diningUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload (file) {

      },
      submitForm() {
        let form = new FormData($('.upForm')[0])
        form.append( 'category',this.value )
        var featureFlag = []
        this.feature.map( ( item,index ) => {
          if( item.f ) {
            featureFlag.push( item.text )
            return
          }
        })
        form.append('feature', JSON.stringify(featureFlag))
        form.append('logoUrl',this.logoUrl)
        form.append('manageUrl',this.manageUrl)
        form.append('diningUrl',this.diningUrl)
        var _this = this
        $.ajax({
          url: 'http://localhost:3000/shop',
          type: 'POST',
          cache: false, //缓存 不必须
          data: form,
          processData: false, //必须
          contentType: false, //必须
          success: function (data) {
            const result = JSON.parse( data )
            console.log("submitForm -> result", result)
            switch ( result.status ) {
              case 0:
                _this.$message({
                  showClose: true,
                  message: '店铺已经存在，请您确认过之后再次添加',
                  type: 'warning'
                });
                break;
              case 2:
                _this.$message({
                  showClose: true,
                  message: '添加成功，即将自动跳转列表页面',
                  type: 'success',
                  duration: 1000
                });
                setTimeout(() => {
                  _this.$router.push('/shop')
                },1000)
                break;
              default:
                break;
            }
          }
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      handleChange(value) {
        console.log(value);
      }
    },
    mounted () {
      console.log('this',this)
    }
  };
</script>

<style lang="stylus" scoped>
    .feature-box
        display flex
        justify-content space-around
        max-width 600px
        flex-wrap wrap
        li
            width 200px
            span 
                &.active
                    color #13ce66
                    font-weight bold
    .avatar-uploader
        width 178px
        height 178px
        display flex
        justify-content center
        align-items center
        border 1px dashed #d9d9d9
        border-radius 5px 
        margin-bottom 15px
        &:hover
          border-color #409eff 
        .el-icon-plus
          &:before 
            font-size 28px
            color #8c939d
    
    
        
</style>