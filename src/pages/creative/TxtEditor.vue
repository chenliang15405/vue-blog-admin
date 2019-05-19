<template>
  <div class="creative-container">
    <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container">
      <el-row>
        <el-col :span="24">
          <el-form-item style="margin-bottom: 40px;" prop="title">
            <input type="text" class="title-input" placeholder="标题">
            <span class="material-input-bar" />
          </el-form-item>
        </el-col>

      </el-row>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'TxtEditor',
  data() {
    return {
      postForm: {
        title: ''
      }
    }
  }

}
</script>

<style scoped lang="scss">

  $font-size-base: 16px;
  $color-black: black;
  $color-grey-light: #E0E0E0;
  $apixel: 1px;
  $color-blue: #2196F3;

  $spacer: 12px;
  $transition: 0.2s ease all;
  $index: 0px;
  $index-has-icon: 30px;

  .creative-container {
    padding: 30px;
    background-color: #fff;

    .form-container {
      .bottom-line {
        width: 100%;
        height: 1px;
        color: #ccc;
        border-bottom: 1px solid #ccc;
      }
      .title-input {
        font-size: $font-size-base;
        padding: $spacer $spacer $spacer - $apixel * 10 $spacer / 2;
        display: block;
        width: 100%;
        border: none;
        line-height: 1;
        border-radius: 0;
        &:focus {
          outline: none;
          border: none;
          border-bottom: 1px solid transparent; // fixes the height issue
          .bottom-line {
            color: $color-blue;
          }
        }

      }

    }

  }

</style>
