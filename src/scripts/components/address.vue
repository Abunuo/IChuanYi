<template>
  <div class="address_contaniner">
    <header>
      <i class="back" onclick="window.history.go(-1)"></i>
      <span class="title">我的收货地址</span>
      <span class="car" v-link="{path: '/car'}"></span>
    </header>
    <section class="content">
      <section class="address" v-show="addressShow && !editShow">
        <ul>
          <li v-for="list in addressList">
            <div class="left">
              <p class="user">
                <span class="name">{{list.name}}</span>
                <span>{{list.phone}}</span>
                <span class="default" v-show="!list.default"></span>
                <span class="default active" v-show="list.default">默认</span>
              </p>
              <p class="userAddress">
                <span>{{list.address.province}}</span>
                <span>{{list.address.country}}</span>
                <span>{{list.address.region}}</span>
                <span>{{list.address.detail}}</span>
              </p>
            </div>
            <span class="right" @click="edit(list)"></span>
          </li>
        </ul>
        <p class="add" @click="add">添加</p>
      </section>
      <section class="edit" v-show="editShow">
        <div class="content">
          <label class="name" for="name">
            <span>姓名：</span>
            <input class="input" name='name' v-model="tempInfo.name" type="text"/>
          </label>
          <label class="phone" for="phone">
            <span>电话号码：</span>
            <input class="input" name='phone' v-model="tempInfo.phone" type="number"/>
          </label>
          <label class="adress" for="adress">
            <span>所在地区：</span>
            <div class="only">
              <input class="short" name='adress' v-model="tempInfo.address.province" type="text"/>
              <input class="short" name='adress' v-model="tempInfo.address.country" type="text"/>
              <input class="short" name='adress' v-model="tempInfo.address.region" type="text"/>
            </div>
          </label>
          <label class="detail" for="detail">
            <span>详细地址：</span>
            <input class="input" name='detail' v-model="tempInfo.address.detail" type="text"/>
          </label>
          <p class="default">
            <span class="check" v-show="tempInfo.default == 1 ? true: false" @click="changeCheck(0)">设为默认地址</span>
            <span class="checkOut" v-show="tempInfo.default == 0 ? true: false" @click="changeCheck(1)">设为默认地址</span>
          </p>
        </div>
        <div class="op">
          <span class="delete" @click="deleteAddress(tempInfo.id)"></span>
          <p class="submit" @click="submit(tempInfo.id)">提交</p>
        </div>
      </section>
      <section class="none" v-show="!addressShow && !editShow">
        <p style="width:100%; text-align: center; font-size:18px; color:#999; margin-top:40px; margin-bottom:30px;">
          你还没有收货地址，请编辑添加~
        </p>
        <p class="add" @click="add">添加</p>
      </section>
    </section>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        addressShow: false,
        editShow: false,
        tempInfo: {
          id: null,
          name: '',
          phone: '',
          address:{
            province: '',
            country: '',
            region: '',
            detail: ''
          },
          default: 0
        },
        addressList: []
      }
    },
    methods: {
      add() {
        this.editShow = true;
        this.tempInfo = {
          id: null,
          name: '',
          phone: '',
          address:{
            province: '',
            country: '',
            region: '',
            detail: ''
          },
          default: 0
        };
      },
      edit(item) {
        this.editShow = true;
        this.tempInfo = item;
      },
      submit(id) {
        if(id != null){
          this.addressList.forEach((item, index) => {
            if(item.id === id) {
              this.addressList[index] = this.tempInfo;
              this.editShow = false;
              if(this.tempInfo.default) {
                this.changeDefault(id);
              }
              return;
            }
          });
        } else {
          this.tempInfo.id = (new Date()).getTime();
          this.addressList.push(this.tempInfo);
          if(this.tempInfo.default) {
            this.changeDefault(this.tempInfo.id);
          }
          this.editShow = false;
          this.addressShow = true;
        }
      },
      changeCheck(temp) {
        this.tempInfo.default = temp;
      },
      changeDefault(id){
        this.addressList.forEach((item, index) => {
          if(item.id != id) {
            this.addressList[index].default = false;
          }
        })
      },
      deleteAddress(id) {
        this.addressList.forEach((item, index) => {
          if(item.id == id) {
            this.addressList.splice(index, 1);
            this.editShow = false;
          }
        });
      }
    },
    ready() {
      var that = this;
      this.$http.get('/rest/adress')
          .then((responses) => {
              if(responses.data){
                that.addressList = responses.data;
                that.addressShow = true;
              }
            });
    }
  }
</script>
